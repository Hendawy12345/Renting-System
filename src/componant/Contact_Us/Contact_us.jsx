import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './contact_us.css';

export default function ContactUs() {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.user_name.trim()) {
      errors.user_name = 'Full name is required';
    }
    if (!formData.user_email) {
      errors.user_email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      errors.user_email = 'Email address is invalid';
    }
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Phone number is invalid';
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    return errors;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    emailjs.sendForm('service_2jngxd8', 'template_o4tlve2', form.current, 'p-ZtlDjQS-z1zY4vq')
      .then((result) => {
          console.log('SUCCESS!', result.text);
          setLoading(false);
          setErrors({});
          setFormStatus('Message sent successfully!');
          setFormData({
            user_name: '',
            user_email: '',
            subject: '',
            phone: '',
            message: ''
          });
      }, (error) => {
          console.log('FAILED...', error.text);
          setLoading(false);
          setFormStatus('Failed to send message. Please try again later.');
      });
  };

  return (
    <div>
      <div className="img">
        <div className="contact_us_layer">
          <h2 className='text_Contact_us'>Contact Us</h2>
        </div>
      </div>

      <div className="contact_us_form">
        <form ref={form} className='contact_form' onSubmit={sendEmail}>
          <div className="names">
            <div className="l_name">
              <label htmlFor="user_name">Full Name</label>
              <input type="text" id="user_name" name="user_name" placeholder='Full Name' value={formData.user_name} onChange={handleChange} />
              {errors.user_name && <p className="error" style={{color:"red"}}>{errors.user_name}</p>}
            </div>
            <div className="l_name">
              <label htmlFor="user_email">E-mail</label>
              <input type="email" id="user_email" name="user_email" placeholder='Email' value={formData.user_email} onChange={handleChange} />
              {errors.user_email && <p className="error" style={{color:"red"}}>{errors.user_email}</p>}
            </div>
          </div>
          <div className="names_sub">
            <div className="l_name">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder='Subject' value={formData.subject} onChange={handleChange} />
              {errors.subject && <p className="error" style={{color:"red"}}>{errors.subject}</p>}
            </div>
            <div className="l_name">
              <label htmlFor="phone">Phone</label>
              <input className='tel' type="tel" id="phone" name="phone" placeholder='Phone' value={formData.phone} onChange={handleChange} />
              {errors.phone && <p className="error" style={{color:"red"}}>{errors.phone}</p>}
            </div>
          </div>

          <div className="textarea">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder='Write a message' value={formData.message} onChange={handleChange}></textarea>
            {errors.message && <p className="error" style={{color:"red"}}>{errors.message}</p>}
          </div>
          <div className="btn_submit">
            <button className='contact_us_submit' type='submit' disabled={loading}>
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </div>
          {formStatus && <p className={formStatus.startsWith('Message sent') ? 'success' : 'error'}>{formStatus}</p>}
        </form>
      </div>
    </div>
  );
}
