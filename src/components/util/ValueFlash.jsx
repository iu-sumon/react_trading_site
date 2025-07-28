import React, { useState, useEffect, useRef } from 'react';
import styles from './ValueFlash.css'; // Assuming you use CSS Modules

/**
 * ValueFlash Component
 * Displays a numerical value and applies a temporary green or red flash
 * when the the value changes from its previous state, based on the sign
 * of the current value.
 *
 * @param {object} props - The component props.
 * @param {number|string} props.value - The current numerical value to display and evaluate for flash color.
 * @param {number} [props.flashDuration=500] - The duration of the flash animation in milliseconds.
 * @param {string} [props.className=''] - Optional CSS class to apply to the container span.
 * @returns {JSX.Element} The rendered component.
 */
export default function ValueFlash({
    value, // Renamed from currentValue for clarity in this context
    flashDuration = 500, // Default flash duration
    className = ''
}) {
    const [flashClass, setFlashClass] = useState('');
    // useRef to keep track of the timeout ID to clear it if updates happen rapidly
    const flashTimeoutRef = useRef(null);
    // useRef to store the value from the *previous* render for comparison
    const previousValueRef = useRef(value);

    // Effect to handle flashing logic whenever the 'value' prop changes
    useEffect(() => {
        const currentNum = parseFloat(value);
        const prevNum = parseFloat(previousValueRef.current);

        // Only trigger flash if the value has actually changed
        // and both are valid numbers (or if one just became a valid number from NaN/null/undefined)
        if (!isNaN(currentNum) && currentNum !== prevNum) {
            if (currentNum > 0) { // Flash green if current value is positive
                setFlashClass(styles.flashGreen);
            } else if (currentNum < 0) { // Flash red if current value is negative
                setFlashClass(styles.flashRed);
            } else {
                // If value is 0, or if it changed to 0, clear any active flash
                setFlashClass('');
            }

            // Clear any existing timeout to prevent multiple flashes overlapping
            if (flashTimeoutRef.current) {
                clearTimeout(flashTimeoutRef.current);
            }

            // Set a new timeout to remove the flash class
            flashTimeoutRef.current = setTimeout(() => {
                setFlashClass('');
            }, flashDuration);
        } else if (flashClass && isNaN(currentNum)) {
             // If value is no longer a number, clear flash.
            setFlashClass('');
            if (flashTimeoutRef.current) {
                clearTimeout(flashTimeoutRef.current);
            }
        }


        // Update previousValueRef.current for the next render's comparison
        previousValueRef.current = currentNum;

        // Cleanup function: Clear the timeout if the component unmounts
        // or if the effect re-runs before the timeout completes.
        return () => {
            if (flashTimeoutRef.current) {
                clearTimeout(flashTimeoutRef.current);
            }
        };
    }, [value, flashDuration, flashClass]); // flashClass added as dependency to properly clear flash when value becomes 0

    return (
        <span className={`${styles.valueFlashContainer} ${flashClass} ${className}`}>
            {value}
        </span>
    );
}
