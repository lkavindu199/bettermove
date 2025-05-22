'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface WhyChooseUsData {
  title: string;
  highlightedText: string;
  benefits: { benefit: string }[];
  formTitle: string;
  moveTypes: { label: string; value: string }[];
  serviceTypes: { label: string; value: string }[];
  submitButtonText: string;
}

export function WhyChooseUs() {
  const [data, setData] = useState<WhyChooseUsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/globals/why-choose-us`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch why choose us data:', err);
        setLoading(false);
      });
  }, []);

  const onSubmit = async (formData: any) => {
    try {
      await axios.post('/api/quote-request', formData);
      setSubmitSuccess(true);
      setSubmitError('');
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      setSubmitError('Failed to submit form. Please try again.');
      console.error('Form submission error:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className="why-choose-us dark-section">
      <div className="container">
        <div className="row">   
          <div className="col-lg-12">
            <div className="why-choose-box">
              <div className="why-choose-content">
                <div className="section-title">
                  <h3 className="wow fadeInUp">why choose us</h3>
                  <h2 className="text-anime-style-2" data-cursor="-opaque">
                    {data.title} <span>{data.highlightedText}</span>
                  </h2>
                </div>

                <div className="why-choose-body wow fadeInUp" data-wow-delay="0.2s">
                  <ul>
                    {data.benefits?.map((item, index) => (
                      <li key={index}>{item.benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="request-quote-form-box wow fadeInUp" data-wow-delay="0.4s">
                <h3>{data.formTitle}</h3>

                <div className="request-quote-form">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="form-group col-md-6 mb-4">
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="name" 
                          {...register("name", { required: true })}
                        />
                        {errors.name && <div className="help-block with-errors">Name is required</div>}
                      </div>
                  
                      <div className="form-group col-md-6 mb-4">
                        <input 
                          type="email" 
                          className="form-control" 
                          placeholder="Email" 
                          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                        />
                        {errors.email && <div className="help-block with-errors">Valid email is required</div>}
                      </div>
                  
                      <div className="form-group col-md-6 mb-4">
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Phone" 
                          {...register("phone", { required: true })}
                        />
                        {errors.phone && <div className="help-block with-errors">Phone is required</div>}
                      </div>
          
                      <div className="form-group col-md-6 mb-4">
                        <input 
                          type="date" 
                          className="form-control" 
                          {...register("date", { required: true })}
                        />
                        {errors.date && <div className="help-block with-errors">Date is required</div>}
                      </div>

                      <div className="form-group col-md-6 mb-4">
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="distance" 
                          {...register("distance", { required: true })}
                        />
                        {errors.distance && <div className="help-block with-errors">Distance is required</div>}
                      </div>

                      <div className="form-group col-md-6 mb-4">
                        <select 
                          className="form-control form-select" 
                          defaultValue="" 
                          {...register("moveType", { required: true })}
                        >
                          <option value="" disabled>move type</option>
                          {data.moveTypes?.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.moveType && <div className="help-block with-errors">Move type is required</div>}
                      </div>

                      <div className="form-group col-md-12 mb-4">
                        <select 
                          className="form-control form-select" 
                          defaultValue="" 
                          {...register("serviceType", { required: true })}
                        >
                          <option value="" disabled>service type</option>
                          {data.serviceTypes?.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.serviceType && <div className="help-block with-errors">Service type is required</div>}
                      </div>

                      <div className="form-group col-md-12">
                        <button type="submit" className="btn-default">
                          {data.submitButtonText}
                        </button>
                        {submitSuccess && (
                          <div className="mt-3 text-success">
                            Thank you! Your request has been submitted.
                          </div>
                        )}
                        {submitError && (
                          <div className="mt-3 text-danger">
                            {submitError}
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>  
        </div>
      </div>
    </div>
  );
}