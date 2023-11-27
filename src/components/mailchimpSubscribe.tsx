import React, { useRef, useState, FormEvent, useId } from 'react';

function MailchimpSubscribe() {
  // 1. Create a reference to the input fields so we can fetch/clear their values.
  const emailInputRef = useRef<HTMLInputElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);

  // 2. Hold a message in state to handle the response from our API.
  const [message, setMessage] = useState<string>('');
  const emailInputId = useId();
  const firstNameId = useId();
  const lastNameId = useId();

  const subscribe = async (e: FormEvent) => {
    e.preventDefault();

    // 3. Send a request to our API with the user's information.
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
      // 4. If there was an error, update the message in state.
      setMessage(error);
      return;
    }

    // 5. Clear the input values and show a success message.
    if (emailInputRef.current) emailInputRef.current.value = '';
    if (firstNameInputRef.current) firstNameInputRef.current.value = '';
    if (lastNameInputRef.current) lastNameInputRef.current.value = '';

    setMessage('Success! 🎉 You are now subscribed to the newsletter.');
  };

  return (
    <form onSubmit={subscribe}>
      <label htmlFor={emailInputId}>{'Email Address'}</label>
      <input
        id={emailInputId}
        name="email"
        placeholder="you@awesome.com"
        ref={emailInputRef}
        required
        type="email"
      />
      
      <label htmlFor={firstNameId}>First Name</label>
      <input
        id={firstNameId}
        name="firstName"
        placeholder="John"
        ref={firstNameInputRef}
        required
        type="text"
      />

      <label htmlFor={lastNameId}>Last Name</label>
      <input
        id={lastNameId}
        name="lastName"
        placeholder="Doe"
        ref={lastNameInputRef}
        type="text"
      />

      <div>
        {message
          ? message
          : `I'll only send emails when new content is posted. No spam.`}
      </div>
      <button type="submit">{'✨ Subscribe 💌'}</button>
    </form>
  );
}

export default MailchimpSubscribe;
