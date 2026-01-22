// import { useState, useEffect } from 'react';
// import './RegistrationForm.css';

// const disposableDomains = ['tempmail.com', 'mailinator.com', '10minutemail.com'];

// const countryStateCity = {
//     USA: {
//         California: ['Los Angeles', 'San Francisco'],
//         Texas: ['Houston', 'Austin']
//     },
//     Canada: {
//         Ontario: ['Toronto', 'Ottawa'],
//         Quebec: ['Montreal', 'Quebec City']
//     }
// };

// const passwordStrength = (pwd) => {
//     let score = 0;
//     if (pwd.length >= 8) score++;
//     if (/[A-Z]/.test(pwd)) score++;
//     if (/[0-9]/.test(pwd)) score++;
//     if (/[^A-Za-z0-9]/.test(pwd)) score++;
//     if (score <= 1) return 'Weak';
//     if (score === 2) return 'Medium';
//     return 'Strong';
// };

// export default function RegistrationForm() {
//     const [form, setForm] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         country: '',
//         state: '',
//         city: '',
//         age: '',
//         gender: '',
//         address: '',
//         password: '',
//         confirmPassword: '',
//         terms: false
//     });

//     const [errors, setErrors] = useState({});
//     const [strength, setStrength] = useState('');
//     const [states, setStates] = useState([]);
//     const [cities, setCities] = useState([]);
//     const [submitted, setSubmitted] = useState(false);

//     useEffect(() => {
//         setStrength(passwordStrength(form.password));
//     }, [form.password]);

//     useEffect(() => {
//         const newErrors = {};

//         // Reactive validation for required fields and specific rules
//         if (form.firstName && form.firstName.trim() === '') newErrors.firstName = 'First name is required';
//         if (form.lastName === '' && form.firstName !== '') newErrors.lastName = 'Last name is required';

//         if (form.email) {
//             const domain = form.email.split('@')[1];
//             if (disposableDomains.includes(domain)) {
//                 newErrors.email = 'Disposable email not allowed';
//             }
//         }

//         if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
//             newErrors.confirmPassword = 'Passwords do not match';
//         }

//         setErrors(newErrors);
//     }, [form.firstName, form.lastName, form.email, form.password, form.confirmPassword]);

//     useEffect(() => {
//         if (form.country) {
//             setStates(Object.keys(countryStateCity[form.country] || {}));
//             setForm(prev => ({ ...prev, state: '', city: '' }));
//         }
//     }, [form.country]);

//     useEffect(() => {
//         if (form.country && form.state) {
//             setCities(countryStateCity[form.country][form.state] || []);
//             setForm(prev => ({ ...prev, city: '' }));
//         }
//     }, [form.state]);

//     const validate = () => {
//         const newErrors = {};
//         if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
//         if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
//         if (!form.email.trim()) newErrors.email = 'Email is required';
//         else {
//             const domain = form.email.split('@')[1];
//             if (disposableDomains.includes(domain)) newErrors.email = 'Disposable email not allowed';
//         }
//         if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
//         if (!form.gender) newErrors.gender = 'Gender is required';
//         if (!form.country) newErrors.country = 'Country is required';
//         if (!form.state) newErrors.state = 'State is required';
//         if (!form.city) newErrors.city = 'City is required';
//         if (!form.password) newErrors.password = 'Password is required';
//         if (form.confirmPassword !== form.password) newErrors.confirmPassword = 'Passwords do not match';
//         if (!form.terms) newErrors.terms = 'You must accept terms';
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setForm(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (validate()) {
//             try {
//                 const res = await fetch('http://localhost:5000/register', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(form)
//                 });
//                 if (res.ok) {
//                     alert('Registration Successful!');
//                     setForm({
//                         firstName: '',
//                         lastName: '',
//                         email: '',
//                         phone: '',
//                         country: '',
//                         state: '',
//                         city: '',
//                         age: '',
//                         gender: '',
//                         address: '',
//                         password: '',
//                         confirmPassword: '',
//                         terms: false
//                     });
//                     setErrors({});
//                     setSubmitted(true);
//                 } else {
//                     alert('Submission failed');
//                 }
//             } catch (err) {
//                 console.error(err);
//                 alert('Error submitting form');
//             }
//         }
//     };

//     const isFormValid = () => {
//         return (
//             form.firstName.trim() !== '' &&
//             form.lastName.trim() !== '' &&
//             form.email.trim() !== '' &&
//             !disposableDomains.includes(form.email.split('@')[1]) &&
//             form.phone.trim() !== '' &&
//             form.gender !== '' &&
//             form.country !== '' &&
//             form.state !== '' &&
//             form.city !== '' &&
//             form.password !== '' &&
//             form.confirmPassword === form.password &&
//             form.terms === true
//         );
//     };

//     return (
//         <div className="registration-form">
//             <h2>Registration</h2>
//             <form onSubmit={handleSubmit} noValidate>
//                 <div className="field">
//                     <label>First Name *</label>
//                     <input name="firstName" value={form.firstName} onChange={handleChange} className={errors.firstName ? 'error' : ''} />
//                     {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
//                 </div>
//                 <div className="field">
//                     <label>Last Name *</label>
//                     <input name="lastName" value={form.lastName} onChange={handleChange} className={errors.lastName ? 'error' : ''} />
//                     {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
//                 </div>
//                 <div className="field">
//                     <label>Email *</label>
//                     <input name="email" type="email" value={form.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
//                     {errors.email && <span className="error-msg">{errors.email}</span>}
//                 </div>
//                 <div className="field">
//                     <label>Phone Number *</label>
//                     <input name="phone" value={form.phone} onChange={handleChange} className={errors.phone ? 'error' : ''} />
//                     {errors.phone && <span className="error-msg">{errors.phone}</span>}
//                 </div>
//                 <div className="field">
//                     <label>Country *</label>
//                     <select name="country" value={form.country} onChange={handleChange} className={errors.country ? 'error' : ''}>
//                         <option value="">Select</option>
//                         {Object.keys(countryStateCity).map(c => (<option key={c} value={c}>{c}</option>))}
//                     </select>
//                     {errors.country && <span className="error-msg">{errors.country}</span>}
//                 </div>
//                 {states.length > 0 && (
//                     <div className="field">
//                         <label>State *</label>
//                         <select name="state" value={form.state} onChange={handleChange} className={errors.state ? 'error' : ''}>
//                             <option value="">Select</option>
//                             {states.map(s => (<option key={s} value={s}>{s}</option>))}
//                         </select>
//                         {errors.state && <span className="error-msg">{errors.state}</span>}
//                     </div>
//                 )}
//                 {cities.length > 0 && (
//                     <div className="field">
//                         <label>City *</label>
//                         <select name="city" value={form.city} onChange={handleChange} className={errors.city ? 'error' : ''}>
//                             <option value="">Select</option>
//                             {cities.map(c => (<option key={c} value={c}>{c}</option>))}
//                         </select>
//                         {errors.city && <span className="error-msg">{errors.city}</span>}
//                     </div>
//                 )}
//                 <div className="field">
//                     <label>Age</label>
//                     <input name="age" type="number" value={form.age} onChange={handleChange} />
//                 </div>
//                 <div className="field">
//                     <label>Gender *</label>
//                     <div className="checkbox-group">
//                         <label><input type="radio" name="gender" value="Male" checked={form.gender === 'Male'} onChange={handleChange} /> Male</label>
//                         <label><input type="radio" name="gender" value="Female" checked={form.gender === 'Female'} onChange={handleChange} /> Female</label>
//                         <label><input type="radio" name="gender" value="Other" checked={form.gender === 'Other'} onChange={handleChange} /> Other</label>
//                     </div>
//                     {errors.gender && <span className="error-msg">{errors.gender}</span>}
//                 </div>
//                 <div className="field">
//                     <label>Address</label>
//                     <textarea name="address" value={form.address} onChange={handleChange} />
//                 </div>
//                 <div className="field">
//                     <label>Password *</label>
//                     <input name="password" type="password" value={form.password} onChange={handleChange} className={errors.password ? 'error' : ''} />
//                     {errors.password && <span className="error-msg">{errors.password}</span>}
//                     <div className="strength">Strength: {strength}</div>
//                 </div>
//                 <div className="field">
//                     <label>Confirm Password *</label>
//                     <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className={errors.confirmPassword ? 'error' : ''} />
//                     {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
//                 </div>
//                 <div className="field checkbox">
//                     <label><input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} /> I accept the Terms & Conditions *</label>
//                     {errors.terms && <span className="error-msg">{errors.terms}</span>}
//                 </div>
//                 <button type="submit" disabled={!isFormValid()}>Register</button>
//             </form>
//         </div>
//     );
// }





import { useState, useEffect } from 'react'
import './RegistrationForm.css'

const disposableDomains = ['tempmail.com', 'mailinator.com', '10minutemail.com']

const countryStateCity = {
    USA: {
        California: ['Los Angeles', 'San Francisco'],
        Texas: ['Houston', 'Austin']
    },
    Canada: {
        Ontario: ['Toronto', 'Ottawa'],
        Quebec: ['Montreal', 'Quebec City']
    }
}

const passwordStrength = pwd => {
    let score = 0
    if (pwd.length >= 8) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++
    if (score <= 1) return 'Weak'
    if (score === 2) return 'Medium'
    return 'Strong'
}

export default function RegistrationForm() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        age: '',
        gender: '',
        address: '',
        password: '',
        confirmPassword: '',
        terms: false
    })

    const [errors, setErrors] = useState({})
    const [strength, setStrength] = useState('')
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    useEffect(() => {
        setStrength(passwordStrength(form.password))
    }, [form.password])

    useEffect(() => {
        if (form.country) {
            setStates(Object.keys(countryStateCity[form.country]))
            setForm(p => ({ ...p, state: '', city: '' }))
        }
    }, [form.country])

    useEffect(() => {
        if (form.state) {
            setCities(countryStateCity[form.country][form.state])
            setForm(p => ({ ...p, city: '' }))
        }
    }, [form.state])

    const validate = () => {
        const e = {}

        if (!form.firstName.trim()) e.firstName = 'First name is required'
        if (!form.lastName.trim()) e.lastName = 'Last name is required'

        if (!form.email.trim()) {
            e.email = 'Email is required'
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(form.email)) {
                e.email = 'Invalid email format'
            } else {
                const domain = form.email.split('@')[1]
                if (disposableDomains.includes(domain)) {
                    e.email = 'Disposable email not allowed'
                }
            }
        }

        if (!form.phone.trim()) {
            e.phone = 'Phone number is required'
        } else {
            const phoneRegex = /^\+\d{10,15}$/
            if (!phoneRegex.test(form.phone)) {
                e.phone = 'Country code is missing or Invalid phone number format'
            }
        }

        if (!form.gender) e.gender = 'Gender is required'
        if (!form.country) e.country = 'Country is required'
        if (!form.state) e.state = 'State is required'
        if (!form.city) e.city = 'City is required'
        if (!form.password) e.password = 'Password is required'
        if (form.password !== form.confirmPassword)
            e.confirmPassword = 'Passwords do not match'
        if (!form.terms) e.terms = 'You must accept terms'

        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleChange = e => {
        const { name, value, type, checked } = e.target
        setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (!validate()) return

        try {
            const res = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })

            if (!res.ok) throw new Error()

            alert('Registration Successful!')
        } catch {
            alert('Error submitting form')
        }
    }

    return (
        <div className="registration-form">
            <h2>Registration</h2>
            <div className="field">
                <label>First Name *</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} className={errors.firstName ? 'error' : ''} />
                {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
            </div>
            <div className="field">
                <label>Last Name *</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} className={errors.lastName ? 'error' : ''} />
                {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
            </div>
            <div className="field">
                <label>Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
                {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>
            <div className="field">
                <label>Phone Number *</label>
                <input name="phone" value={form.phone} onChange={handleChange} className={errors.phone ? 'error' : ''} />
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
            </div>
            <div className="field">
                <label>Country *</label>
                <select name="country" value={form.country} onChange={handleChange} className={errors.country ? 'error' : ''}>
                    <option value="">Select</option>
                    {Object.keys(countryStateCity).map(c => (<option key={c} value={c}>{c}</option>))}
                </select>
                {errors.country && <span className="error-msg">{errors.country}</span>}
            </div>
            {states.length > 0 && (
                <div className="field">
                    <label>State *</label>
                    <select name="state" value={form.state} onChange={handleChange} className={errors.state ? 'error' : ''}>
                        <option value="">Select</option>
                        {states.map(s => (<option key={s} value={s}>{s}</option>))}
                    </select>
                    {errors.state && <span className="error-msg">{errors.state}</span>}
                </div>
            )}
            {cities.length > 0 && (
                <div className="field">
                    <label>City *</label>
                    <select name="city" value={form.city} onChange={handleChange} className={errors.city ? 'error' : ''}>
                        <option value="">Select</option>
                        {cities.map(c => (<option key={c} value={c}>{c}</option>))}
                    </select>
                    {errors.city && <span className="error-msg">{errors.city}</span>}
                </div>
            )}
            <div className="field">
                <label>Age</label>
                <input name="age" type="number" value={form.age} onChange={handleChange} />
            </div>
            <div className="field">
                <label>Gender *</label>
                <div className="checkbox-group">
                    <label><input type="radio" name="gender" value="Male" checked={form.gender === 'Male'} onChange={handleChange} /> Male</label>
                    <label><input type="radio" name="gender" value="Female" checked={form.gender === 'Female'} onChange={handleChange} /> Female</label>
                    <label><input type="radio" name="gender" value="Other" checked={form.gender === 'Other'} onChange={handleChange} /> Other</label>
                </div>
                {errors.gender && <span className="error-msg">{errors.gender}</span>}
            </div>
            <div className="field">
                <label>Address</label>
                <textarea name="address" value={form.address} onChange={handleChange} />
            </div>
            <div className="field">
                <label>Password *</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} className={errors.password ? 'error' : ''} />
                {errors.password && <span className="error-msg">{errors.password}</span>}
                <div className="strength">Strength: {strength}</div>
            </div>
            <div className="field">
                <label>Confirm Password *</label>
                <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className={errors.confirmPassword ? 'error' : ''} />
                {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
            </div>
            <div className="field checkbox">
                <label><input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} /> I accept the Terms & Conditions *</label>
                {errors.terms && <span className="error-msg">{errors.terms}</span>}
            </div>
            <form onSubmit={handleSubmit} noValidate>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}   
