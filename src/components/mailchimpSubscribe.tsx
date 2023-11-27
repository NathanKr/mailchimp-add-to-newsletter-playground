import React, { useRef, useState, FormEvent, useId } from 'react';
import styles from "@/styles/mailchimp-subscribe.module.css"; 

function MailchimpSubscribe() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>('');
  const emailInputId = useId();

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

    setMessage('Success! 🎉 You are now subscribed to the newsletter.');
  };

  return (
    <form className={styles.mailchimpForm} onSubmit={subscribe}>
      <label htmlFor={emailInputId} className={styles.formLabel}>
        {'Email Address'}
      </label>
      <input
        id={emailInputId}
        name="email"
        placeholder="you@awesome.com"
        ref={emailInputRef}
        required
        type="email"
        className={styles.formInput}
      />

      <label htmlFor="firstName" className={styles.formLabel}>
        First Name
      </label>
      <input
        id="firstName"
        name="firstName"
        placeholder="John"
        ref={firstNameInputRef}
        type="text"
        className={styles.formInput}
      />

      <label htmlFor="lastName" className={styles.formLabel}>
        Last Name
      </label>
      <input
        id="lastName"
        name="lastName"
        placeholder="Doe"
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
