import React, { useState } from 'react';


function App() {

	// EMAIL VALIDATION:

	const [email, setEmail] = useState('');
	const [isEmailCorrect, setIsEmailCorrect] = useState(false);

	const onEmailHandler = function (event) {
		const emailValue = event.target.value;
		const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]+)\])/;

		setEmail(emailValue);
		setIsEmailCorrect(emailPattern.test(emailValue));
	};

	// PASSWORD VALIDATION:

	const [pwd, setPwd] = useState('');
	const [isLowerCasePresent, setIsLowerCasePresent] = useState(false);
	const [isUpperCasePresent, setIsUpperCasePresent] = useState(false);
	const [isNumberPresent, setIsNumberPresent] = useState(false);
	const [isMinLength8, setIsMinLength8] = useState(false);

	const onPwHandler = function(event) {

		const pwdValue = event.target.value;
		// regular expressions
		const lowercaseLetterPattern = /[a-z]/;
		const uppercaseLetterPattern = /[A-Z]/;
		const numbersPattern = /[0-9]/;

		setPwd(pwdValue);

		setIsLowerCasePresent(lowercaseLetterPattern.test(pwdValue));
		setIsUpperCasePresent(uppercaseLetterPattern.test(pwdValue));
		setIsNumberPresent(numbersPattern.test(pwdValue));
		setIsMinLength8(pwdValue.length > 7);

	};

	// CARD VALIDATION:

	const [card, setCard] = useState('');
	const [areOnlyNumbersPresent, setAreOnlyNumbersPresent] = useState(false);
	const [is13To19Characters, setIs13To19Characters] = useState(false);
	const [startsWithNumber2To6, setStartsWithNumber2To6] = useState(false);
	const [passesLuhnAlgorithm, setPassesLuhnAlgorithm] = useState(false);

	const onCardHandler = function(event) {
		const cardValue = event.target.value;
		const onlyNumbersPattern = /^[0-9]+$/;

		setCard(cardValue);

		setAreOnlyNumbersPresent(onlyNumbersPattern.test(cardValue));
		setIs13To19Characters(cardValue.length >= 13 && cardValue.length <= 19);
		setStartsWithNumber2To6(Number(cardValue[0]) >= 2 && Number(cardValue[0]) <= 6);

		const luhnFormulaResult = cardNumberToCheck => {
			// ? Drop the last digit. It is what we'll check against
			const lastDigit = cardNumberToCheck.slice(cardNumberToCheck.length - 1);			
			let manipulatedNumber = cardNumberToCheck.slice(0, cardNumberToCheck.length - 1);	
			// ? Reverse the numbers
			let cardNumberArray = manipulatedNumber.split("").reverse();	
			// ? Multiply the digits in odd positions (1st, 3rd, 5th, etc.) by 2 AND subtract 9 from all numbers greater than 9
			cardNumberArray = cardNumberArray.map((el, index) => (index % 2 === 0) ? ((el * 2 > 9) ? (el * 2 - 9) : (el * 2)) : Number(el) );	
			// ? Add all the numbers together
			let reducedArr = cardNumberArray.reduce((acc, curr) => acc + curr, 0);	
			// ? The lastDigit is the amount that you would need to add to get a multiple of 10
			let luhnResult = (Number(lastDigit) + reducedArr) % 10 === 0;
	
			return luhnResult;
		}
		
		setPassesLuhnAlgorithm(luhnFormulaResult(cardValue));
	}


	return (
		<main>
			<h1>Form validator</h1>
			<form>
				<label htmlFor="username">Username</label>
				<input type="text" id="username" placeholder="Rory Bobich" onChange={onEmailHandler} />

				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					placeholder="email@example.com" 
					value={email}
					onChange={onEmailHandler}
				/>

				<label htmlFor="password">Password</label>
				<input type="password" id="password" value={pwd} placeholder="**********" onChange={onPwHandler} />

				<label htmlFor="cardNum">Card number</label>
				<input
					type="tel"
					inputMode="numeric"
					name="card_number"
					id="cardNum"
					value={card}
					minLength="13"
					maxLength="19"
					placeholder="xxxx xxxx xxxx xxxx" onChange={onCardHandler}
				/>

				<button type="submit" id="submitButton" disabled={!(isEmailCorrect && isLowerCasePresent && isUpperCasePresent && isNumberPresent && isMinLength8 && areOnlyNumbersPresent && is13To19Characters && startsWithNumber2To6 && passesLuhnAlgorithm)}>
					Submit
				</button>
			</form>

			<section>
				<h2>Email address requirements</h2>
				<ul className="invalid">
					<li className={isEmailCorrect ? "valid" : "invalid"}>Is valid</li>
				</ul>
			</section>

			<section>
				<h2>Password requirements</h2>
				<ul id="password-validation">
					<li id="lowercase" className={isLowerCasePresent ? "valid" : "invalid"}>
						A lowercase letter
					</li>
					<li id="uppercase" className={isUpperCasePresent ? "valid" : "invalid"}>
						A capital (uppercase) letter
					</li>
					<li id="number" className={isNumberPresent ? "valid" : "invalid"}>
						A number
					</li>
					<li id="minChars" className={isMinLength8 ? "valid" : "invalid"}>
						Minimum 8 characters
					</li>
				</ul>
			</section>

			<section>
				<h2>Card number requirements</h2>
				<ul id="card-validation">
					<li id="card-only-numbers" className={areOnlyNumbersPresent ? "valid" : "invalid"}>
						Numbers only
					</li>
					<li id="minmax-card-length" className={is13To19Characters ? "valid" : "invalid"}>
						13–19 characters long
					</li>
					<li id="card-valid-start" className={startsWithNumber2To6 ? "valid" : "invalid"}>
						Starts with a number between 2 and 6
					</li>
					<li id="card-luhn-formula" className={passesLuhnAlgorithm ? "valid" : "invalid"}>
						Passes the Luhn Formula check
					</li>
				</ul>
			</section>
		</main>
	);
}

export default App;
