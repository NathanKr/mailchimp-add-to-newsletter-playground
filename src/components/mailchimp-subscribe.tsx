import React, { useRef, useState, FormEvent, useId } from 'react';
import styles from "@/styles/mailchimp-subscribe.module.css"; 

function MailchimpSubscribe() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>('');

  const subscribe = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: emailInputRef.current?.value,
        firstName: firstNameInputRef.current?.value,
        lastName: lastNameInputRef.current?.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const { error } = await res.json();

    if (error) {
      setMessage(error);
      return;
    }

    emailInputRef.current && (emailInputRef.current.value = '');
    firstNameInputRef.current && (firstNameInputRef.current.value = '');
    lastNameInputRef.current && (lastNameInputRef.current.value = '');

    setMessage('Success! 🎉 A confirmation email is send to you , click on it to subscribe to the newsletter.');
  };

  return (
    <form className={styles.mailchimpForm} onSubmit={subscribe}>
      <input
        name="email"
        placeholder="Your email"
        ref={emailInputRef}
        required
        type="email"
        className={styles.formInput}
      />
      
      <input
        name="firstName"
        placeholder="First Name"
        ref={firstNameInputRef}
        type="text"
        className={styles.formInput}
        required
      />

      <input
        name="lastName"
        placeholder="Last Name"
        ref={lastNameInputRef}
        type="text"
        className={styles.formInput}
      />

      <div className={styles.formMessage}>
        {message ? message : `I'll only send emails when new content is posted. No spam.`}
      </div>
      <button type="submit" className={styles.formButton}>
        {'✨ Subscribe 💌'}
      </button>
    </form>
  );
}

export default MailchimpSubscribe;
