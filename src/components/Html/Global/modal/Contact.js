import React, { useState } from 'react';

import { Form, Row, Button, Col } from 'react-bootstrap';

const Contact = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    company: '',
    companytype: '',
    jobtitle: '',
    email: '',
    phone: '',
    solutionsofinterest: '',
    comments: '',
    optin: false,
  });

  const [validated, setValidated] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = e => {
    e.preventDefault();
    const isCheckbox = e.currentTarget.type === 'checkbox';
    setFormData({
      ...formData,
      [e.currentTarget.name]: isCheckbox
        ? e.currentTarget.checked
        : e.currentTarget.value,
    });
  };

  const handleSubmit = async event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setIsInvalid(true);
      setValidated(true);

      event.preventDefault();
      event.stopPropagation();
    } else {
      setIsInvalid(false);
      setIsSuccessful(true);
      // setValidated(false);
    }
  };

  const FlipOverback = () => {
    document.querySelector('.flipOver').classList.toggle('flipOverActive');
    document.querySelector('.carousel').classList.remove('carouselActive');
    document.querySelector('.productModalContent').classList.remove('productModalContentActive');
    // document.querySelector('.flip-back').classList.toggle('flip-backActive');
    // document.querySelector('.backForm').classList.toggle('backFormActive');
  }

  return (
    <div className='flip-back'>
      <div className='row inner'>
        <div className='col-auto account-icon'>
        <div className="userIcon"></div>
        </div>
        <div className='col-12 backFormHead'>
          <h2 className="backFormTitle">Send Us an Inquiry</h2>
        </div>
        <div className='col-12 form-indent'>
        <hr className='prdLione backSideHr' />
          <p className='form-subheading'>
            To send an inquiry to an LG representative, please fill out and
            submit the form below.
          </p>
          <div className='leftline inquiry'></div>
        </div>
        {isInvalid && (
          <div className='col-12 form-indent'>
            <p className='input-warning'>
              Please correct the highlighted fields.
            </p>
          </div>
        )}

        <iframe
          title='popupForm'
          name='form-submit-iframe'
          style={{ display: 'none', pointerEvents: 'none' }}
        ></iframe>

        <Form
          className='inquiry-form mt-5'
          method='post'
          id='contactform'
          noValidate
          action='https://go.pardot.com/l/83682/2020-11-17/gy5jfg'
          validated={validated}
          onSubmit={handleSubmit}
          style={{ display: !isSuccessful ? 'block' : 'none' }}
          target='form-submit-iframe'
          onChange={e => handleChange(e)}
        >
          <Row className="mb-4">
            <Form.Group as={Col} controlId="firstName">
              <Form.Control type="text" placeholder="First Name*" />
            </Form.Group>

            <Form.Group as={Col} controlId="lastName">
              <Form.Control type="text" placeholder="Last Name" />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group sm={5} as={Col} controlId="company">
              <Form.Control type="text" placeholder="Company*" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAddress2">
              <Form.Select defaultValue="Company Type: ">
                  <option>Choose...</option>
                  <option>...</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group sm={4} as={Col} controlId="zipCode">
              <Form.Control type="number" placeholder="Zip Code*" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAddress2">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group sm={4} as={Col} controlId="phone">
              <Form.Control type="tel" placeholder="Phone*" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAddress2">
              <Form.Select defaultValue="Solution of Interest">
                <option>Choose...</option>
                <option>...</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Control type="text" placeholder="Comment*" />
            </Form.Group>
          </Row>

          <Form.Group className="mb-4" id="formGridCheckbox">
            <Form.Check type="checkbox" label="Yes, I want to receive information about LG products from LG Electronics, USA and its partners." />
          </Form.Group>
        </Form>
        <div className="formBtn">
        <Button variant="primary" type="submit">
            Submit
          </Button>

          <Button className="cancelBtn" onClick={FlipOverback} >
            <div className="cancelIcon"></div>
            Cancel Inquiry Form
          </Button>
        </div>
        {/* <!-- Success Message --> */}
        <div
          className='success-form'
          id='success-message'
          style={{ display: isSuccessful ? 'block' : 'none' }}
        >
          <div className='row'>
            <div className='col'>
              <h2>Thank You For Your Message</h2>
            </div>
            <div className='col-12 success-info'>
              <p>
                Your message has successfully been sent to LG Digitour+.
                <br />
                We look forward to fulfilling your LG product support needs.
              </p>
            </div>
            <div className='col-auto'>
              <div className='form-group form-submit'>
                <button
                  className='md-form-submit md-close-success'
                  onClick={closeModal}
                  tabIndex='0'
                >
                  <img
                    alt=''
                    className='modal-icon'
                    src='/assets/img/icons/arrow-right.svg'
                  />
                  Return to Digitour+
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Success Message End --> */}
      </div>
    </div>
  );
};

export default Contact;
