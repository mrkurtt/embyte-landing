'use client';

import { useState, useRef, useCallback, useEffect, type FormEvent } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { FormField, RadioGroup, SelectField, CheckboxGroup } from './FormField';

interface RsvpGuestFormProps {
  partner1Name?: string;
  partner2Name?: string;
  eventDate?: string;
  coverImageUrl?: string | null;
}

const MEAL_OPTIONS = [
  { value: 'chicken', label: 'Chicken' },
  { value: 'beef', label: 'Beef' },
  { value: 'fish', label: 'Fish' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
];

const DIETARY_OPTIONS = [
  { value: 'gluten-free', label: 'Gluten-free' },
  { value: 'nut-allergy', label: 'Nut allergy' },
  { value: 'dairy-free', label: 'Dairy-free' },
  { value: 'halal', label: 'Halal' },
  { value: 'kosher', label: 'Kosher' },
  { value: 'none', label: 'None' },
  { value: 'other', label: 'Other' },
];

export function RsvpGuestForm({
  partner1Name = 'Kurt',
  partner2Name = 'Alye',
  eventDate = 'August 8, 2026',
  coverImageUrl,
}: RsvpGuestFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState('');
  const [guests, setGuests] = useState('');
  const [plusOneName, setPlusOneName] = useState('');
  const [meal, setMeal] = useState('');
  const [dietary, setDietary] = useState<string[]>([]);
  const [dietaryOther, setDietaryOther] = useState('');
  const [songRequest, setSongRequest] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shakeFields, setShakeFields] = useState<Record<string, boolean>>({});
  const [successVisible, setSuccessVisible] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const isAttending = attending === 'yes';
  const guestCount = parseInt(guests, 10) || 0;
  const showPlusOne = isAttending && guestCount > 1;

  const validate = useCallback(() => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!email.trim()) {
      next.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Enter a valid email';
    }
    if (!attending) next.attending = 'Please let us know if you can make it';
    if (isAttending) {
      if (!guests.trim()) next.guests = 'Number of guests is required';
      if (showPlusOne && !plusOneName.trim()) next.plusOneName = "Guest's name is required";
      if (!meal) next.meal = 'Please select a meal';
      if (dietary.length === 0) next.dietary = 'Please select an option';
      if (dietary.includes('other') && !dietaryOther.trim()) next.dietaryOther = 'Please specify your dietary need';
    }
    return next;
  }, [name, email, attending, guests, plusOneName, showPlusOne, meal, dietary, dietaryOther, isAttending]);

  const validateField = useCallback(
    (field: string) => {
      const next: Record<string, string> = {};
      if (field === 'name' && !name.trim()) next.name = 'Name is required';
      if (field === 'email') {
        if (!email.trim()) next.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email';
      }
      if (field === 'attending' && !attending) next.attending = 'Please let us know if you can make it';
      if (field === 'guests' && isAttending && !guests.trim()) next.guests = 'Number of guests is required';
      if (field === 'plusOneName' && showPlusOne && !plusOneName.trim()) next.plusOneName = "Guest's name is required";
      if (field === 'meal' && isAttending && !meal) next.meal = 'Please select a meal';
      if (field === 'dietary' && isAttending && dietary.length === 0) next.dietary = 'Please select an option';
      return next;
    },
    [name, email, attending, guests, plusOneName, showPlusOne, meal, dietary, isAttending],
  );

  const triggerShake = useCallback((fields: string[]) => {
    const next: Record<string, boolean> = {};
    fields.forEach((f) => (next[f] = true));
    setShakeFields(next);
    setTimeout(() => setShakeFields({}), 600);
  }, []);

  function handleBlur(field: string) {
    const fieldErrors = validateField(field);
    setErrors((prev) => {
      const next = { ...prev };
      if (fieldErrors[field]) {
        next[field] = fieldErrors[field];
      } else {
        delete next[field];
      }
      return next;
    });
  }

  function clearError(field: string) {
    if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      triggerShake(Object.keys(nextErrors));
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setSubmitted(true);
    requestAnimationFrame(() => setSuccessVisible(true));
  }

  if (submitted) {
    const attendingText = isAttending
      ? 'We look forward to celebrating with you.'
      : "We'll miss you. Thank you for letting us know.";

    return (
      <div className="mx-auto max-w-md text-center">
        <div
          className={`transition-all duration-500 ease-out ${
            successVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
          }`}
        >
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: 'var(--theme-accent)' }}
          >
            <CheckCircle
              className="h-8 w-8"
              style={{ color: 'var(--theme-primary)' }}
            />
          </div>
          <h2
            className="text-3xl font-bold text-[var(--theme-text)]"
            style={{ fontFamily: 'var(--theme-font-heading)' }}
          >
            {isAttending ? 'Thank you' : 'Noted'}
          </h2>
          <p className="mt-3 text-lg text-[var(--theme-text-secondary)]">
            {attendingText}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)]">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[var(--theme-text-secondary)]">
            RSVP Form
          </p>
          <h1
            className="text-2xl font-bold text-[var(--theme-text)]"
            style={{ fontFamily: 'var(--theme-font-heading)' }}
          >
            {partner1Name} & {partner2Name}
          </h1>
          <p className="mt-1 text-sm text-[var(--theme-text-secondary)]">
            {eventDate}
          </p>
        </div>

        {/* Cover Image */}
        {coverImageUrl && (
          <div className="px-6">
            <img
              src={coverImageUrl}
              alt="Wedding cover"
              className="h-40 w-full rounded-xl object-cover"
            />
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6" noValidate>
          <div className="space-y-4">
            {/* Name */}
            <FormField
              ref={nameRef}
              label="Your Name"
              placeholder="Full name"
              value={name}
              onChange={(e) => { setName(e.target.value); clearError('name'); }}
              onBlur={() => handleBlur('name')}
              error={errors.name}
              shake={shakeFields.name}
              autoComplete="name"
            />

            {/* Email */}
            <FormField
              label="Email"
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearError('email'); }}
              onBlur={() => handleBlur('email')}
              error={errors.email}
              shake={shakeFields.email}
              autoComplete="email"
            />

            {/* Attendance */}
            <RadioGroup
              label="Will you be attending?"
              name="attending"
              value={attending}
              onChange={(v) => { setAttending(v); clearError('attending'); }}
              options={[
                { value: 'yes', label: 'Joyfully accepts' },
                { value: 'no', label: 'Regretfully declines' },
              ]}
              error={errors.attending}
              shake={shakeFields.attending}
            />

            {/* Conditional fields — only when attending */}
            {isAttending && (
              <>
                {/* Number of Guests */}
                <FormField
                  label="Number of Guests"
                  type="number"
                  placeholder="1"
                  min={1}
                  max={10}
                  value={guests}
                  onChange={(e) => { setGuests(e.target.value); clearError('guests'); }}
                  onBlur={() => handleBlur('guests')}
                  error={errors.guests}
                  shake={shakeFields.guests}
                />

                {/* Plus-one name */}
                {showPlusOne && (
                  <FormField
                    label="Guest's Name"
                    placeholder="Full name of your plus-one"
                    value={plusOneName}
                    onChange={(e) => { setPlusOneName(e.target.value); clearError('plusOneName'); }}
                    onBlur={() => handleBlur('plusOneName')}
                    error={errors.plusOneName}
                    shake={shakeFields.plusOneName}
                  />
                )}

                {/* Meal Preference */}
                <SelectField
                  label="Meal Preference"
                  value={meal}
                  onChange={(v) => { setMeal(v); clearError('meal'); }}
                  options={MEAL_OPTIONS}
                  placeholder="Select your meal"
                  error={errors.meal}
                  shake={shakeFields.meal}
                />

                {/* Dietary Restrictions */}
                <CheckboxGroup
                  label="Dietary Restrictions"
                  options={DIETARY_OPTIONS}
                  values={dietary}
                  onChange={(v) => { setDietary(v); clearError('dietary'); }}
                  otherValue={dietaryOther}
                  onOtherChange={setDietaryOther}
                  error={errors.dietary}
                  shake={shakeFields.dietary}
                />

                {/* Song Request */}
                <FormField
                  label="Song Request (optional)"
                  placeholder="What song gets you on the dance floor?"
                  value={songRequest}
                  onChange={(e) => setSongRequest(e.target.value)}
                />
              </>
            )}

            {/* Message */}
            <div className={shakeFields.message ? 'animate-shake' : ''}>
              <label className="mb-1.5 block text-sm font-medium text-[var(--theme-text)]">
                {isAttending ? 'Message for the couple (optional)' : 'Message (optional)'}
              </label>
              <textarea
                rows={3}
                placeholder={isAttending ? 'A note for the couple...' : "Let them know you're thinking of them..."}
                maxLength={500}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 py-3 text-sm text-[var(--theme-text)] placeholder:text-[var(--theme-text-secondary)]/60 transition-colors duration-200 resize-none focus-visible:border-[var(--theme-border-focus)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-border-focus)]/20"
              />
              <p className="mt-1 text-right text-xs text-[var(--theme-text-secondary)]/40">
                {message.length}/500
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-medium text-[var(--theme-text-inverse)] transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60"
            style={{ backgroundColor: 'var(--theme-primary)' }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send RSVP'
            )}
          </button>
        </form>
      </div>

      <p className="mt-4 text-center text-xs text-[var(--theme-text-secondary)]">
        Powered by{' '}
        <span className="font-medium text-[var(--theme-text)]">embyte</span>
      </p>
    </div>
  );
}
