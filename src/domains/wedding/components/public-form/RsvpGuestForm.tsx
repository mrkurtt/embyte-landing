'use client';

import { useState, useRef, useCallback, useEffect, type FormEvent } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useTheme } from '@/shared/theme/useTheme';
import { FormField, RadioGroup, SelectField, CheckboxGroup } from './FormField';
import { mockRsvpForms } from '@/domains/wedding/data/mocks';

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
  partner1Name = mockRsvpForms[0].partner1Name,
  partner2Name = mockRsvpForms[0].partner2Name,
  eventDate = mockRsvpForms[0].eventDateDisplay,
  coverImageUrl,
}: RsvpGuestFormProps) {
  const theme = useTheme();
  const deco = theme.decoration;
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
  const showPlusOne = isAttending && guests === '2';

  const hasCorners = !!deco.cornerAsset;
  const hasDivider = !!deco.dividerAsset;
  const hasFrame = deco.frameStyle !== 'none';
  const hasSubmitAsset = !!deco.submitAsset;

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
      if (!guests) next.guests = 'Please select who is attending';
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
      if (field === 'guests' && isAttending && !guests) next.guests = 'Please select who is attending';
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
      <div className="mx-auto w-full max-w-md">
        <div className={`relative overflow-hidden ${hasFrame ? 'p-3 sm:p-4' : ''}`}>
          {hasCorners && (
            <>
              <img src={deco.cornerAsset!} alt="" aria-hidden="true" className="pointer-events-none absolute -left-2 -top-2 h-28 w-28 mix-blend-multiply" style={{ opacity: deco.cornerOpacity ?? '0.3' }} />
              <img src={deco.cornerAsset!} alt="" aria-hidden="true" className="pointer-events-none absolute -right-2 -top-2 h-28 w-28 scale-x-[-1] mix-blend-multiply" style={{ opacity: deco.cornerOpacity ?? '0.3' }} />
              <img src={deco.cornerAsset!} alt="" aria-hidden="true" className="pointer-events-none absolute -left-2 -bottom-2 h-28 w-28 rotate-[-90deg] mix-blend-multiply" style={{ opacity: deco.cornerOpacity ?? '0.3' }} />
              <img src={deco.cornerAsset!} alt="" aria-hidden="true" className="pointer-events-none absolute -right-2 -bottom-2 h-28 w-28 rotate-[90deg] scale-x-[-1] mix-blend-multiply" style={{ opacity: deco.cornerOpacity ?? '0.3' }} />
            </>
          )}
          <div
            className={`bg-[var(--theme-surface)] transition-colors duration-300 ${
              hasFrame
                ? deco.frameStyle === 'double'
                  ? 'rounded-2xl border-2 border-[var(--theme-border)]/40 p-[1px]'
                  : 'rounded-2xl border border-[var(--theme-border)]'
                : 'rounded-none border-none'
            }`}
          >
            <div
              className={`transition-colors duration-300 ${
                hasFrame
                  ? deco.frameStyle === 'double'
                    ? 'overflow-hidden rounded-[14px] border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-2xl'
                    : 'overflow-hidden rounded-[14px] border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-lg'
                  : ''
              }`}
            >
              <div className={`p-8 text-center transition-all duration-500 ease-out ${
                successVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
              }`}>
                {hasSubmitAsset && (
                  <img
                    src={deco.submitAsset!}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none mx-auto mb-4 h-12 w-auto"
                    style={{ opacity: deco.submitOpacity ?? '0.5' }}
                  />
                )}
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
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Outer frame wrapper */}
      <div className={`relative overflow-hidden ${hasFrame ? 'p-3 sm:p-4' : ''}`}>
        {/* Decorative corner assets */}
        {hasCorners && (
          <>
            <img
              src={deco.cornerAsset!}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -left-2 -top-2 h-28 w-28 mix-blend-multiply transition-opacity duration-300"
              style={{ opacity: deco.cornerOpacity ?? '0.3' }}
            />
            <img
              src={deco.cornerAsset!}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -top-2 h-28 w-28 scale-x-[-1] mix-blend-multiply transition-opacity duration-300"
              style={{ opacity: deco.cornerOpacity ?? '0.3' }}
            />
            <img
              src={deco.cornerAsset!}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -left-2 -bottom-2 h-28 w-28 rotate-[-90deg] mix-blend-multiply transition-opacity duration-300"
              style={{ opacity: deco.cornerOpacity ?? '0.3' }}
            />
            <img
              src={deco.cornerAsset!}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -bottom-2 h-28 w-28 rotate-[90deg] scale-x-[-1] mix-blend-multiply transition-opacity duration-300"
              style={{ opacity: deco.cornerOpacity ?? '0.3' }}
            />
          </>
        )}

        {/* Inner card */}
        <div
          className={`bg-[var(--theme-surface)] transition-colors duration-300 ${
            hasFrame
              ? deco.frameStyle === 'double'
                ? 'rounded-2xl border-2 border-[var(--theme-border)]/40 p-[1px]'
                : 'rounded-2xl border border-[var(--theme-border)]'
              : 'rounded-none border-none'
          }`}
        >
          <div
            className={`transition-colors duration-300 ${
              hasFrame
                ? `overflow-hidden rounded-[14px] border border-[var(--theme-border)] bg-[var(--theme-surface)] ${
                    deco.frameStyle === 'double' ? 'shadow-2xl' : 'shadow-lg'
                  }`
                : ''
            }`}
          >
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

            {/* Divider after header */}
            {hasDivider && (
              <div className="flex items-center justify-center gap-2 px-8 -mt-1 mb-1">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--theme-border)] to-transparent transition-colors duration-300" />
                <img
                  src={deco.dividerAsset!}
                  alt=""
                  aria-hidden="true"
                  className="h-5 w-auto transition-opacity duration-300"
                  style={{ opacity: deco.dividerOpacity ?? '0.4' }}
                />
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--theme-border)] to-transparent transition-colors duration-300" />
              </div>
            )}

            {/* Cover Image */}
            {coverImageUrl && (
              <div className="px-6">
                <div className="overflow-hidden rounded-2xl shadow-lg transition-all duration-300">
                  <img
                    src={coverImageUrl}
                    alt="Wedding cover"
                    className="h-40 w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
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
                {/* Guest count — segmented control */}
                <div className={shakeFields.guests ? 'animate-shake' : ''}>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--theme-text)]">
                    Who&apos;s attending?
                  </label>
                  <div
                    role="radiogroup"
                    aria-describedby={errors.guests ? 'guests-error' : undefined}
                    className="flex gap-3"
                  >
                    <label
                      className={[
                        'flex flex-1 cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200',
                        guests === '1'
                          ? 'border-[var(--theme-border-focus)] bg-[var(--theme-border-focus)]/10 text-[var(--theme-text)]'
                          : 'border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text-secondary)] hover:border-[var(--theme-border-focus)]/30',
                      ].join(' ')}
                    >
                      <input
                        type="radio"
                        name="guestCount"
                        value="1"
                        checked={guests === '1'}
                        onChange={() => { setGuests('1'); setPlusOneName(''); clearError('guests'); }}
                        className="sr-only"
                      />
                      Just me
                    </label>
                    <label
                      className={[
                        'flex flex-1 cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200',
                        guests === '2'
                          ? 'border-[var(--theme-border-focus)] bg-[var(--theme-border-focus)]/10 text-[var(--theme-text)]'
                          : 'border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text-secondary)] hover:border-[var(--theme-border-focus)]/30',
                      ].join(' ')}
                    >
                      <input
                        type="radio"
                        name="guestCount"
                        value="2"
                        checked={guests === '2'}
                        onChange={() => { setGuests('2'); clearError('guests'); }}
                        className="sr-only"
                      />
                      Me + 1
                    </label>
                  </div>
                  {errors.guests && (
                    <p id="guests-error" role="alert" className="mt-1 text-xs text-[var(--theme-error)]">
                      {errors.guests}
                    </p>
                  )}
                </div>

                {/* Plus-one name — animated */}
                {showPlusOne && (
                  <div className="animate-slide-down">
                    <FormField
                      label="Your guest's name"
                      placeholder="Full name of the person accompanying you"
                      value={plusOneName}
                      onChange={(e) => { setPlusOneName(e.target.value); clearError('plusOneName'); }}
                      onBlur={() => handleBlur('plusOneName')}
                      error={errors.plusOneName}
                      shake={shakeFields.plusOneName}
                    />
                    <p className="mt-1 text-[11px] text-[var(--theme-text-secondary)]/50">
                      Their meal and dietary preferences will be collected separately at the event.
                    </p>
                  </div>
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

              {/* Submit with swan motif */}
              {hasSubmitAsset && (
                <div className="mt-6 flex items-center justify-center">
                  <img
                    src={deco.submitAsset!}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none h-10 w-auto transition-opacity duration-300"
                    style={{ opacity: deco.submitOpacity ?? '0.5' }}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-medium text-[var(--theme-text-inverse)] transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60"
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
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-[var(--theme-text-secondary)]">
        Powered by{' '}
        <span className="font-medium text-[var(--theme-text)]">embyte</span>
      </p>
    </div>
  );
}
