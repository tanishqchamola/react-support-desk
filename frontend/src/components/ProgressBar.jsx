import { useState, useEffect } from "react";

// Password strength analyzer
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import zxcvbnEnPackage from "@zxcvbn-ts/language-en";

function ProgressBar({ password }) {
	const [passwordScore, setPasswordScore] = useState(null);

	const strength = ["", "Weak", "Average", "Strong", "Very Strong"];

	useEffect(() => {
		const options = {
			translations: zxcvbnEnPackage.translations,
			graphs: zxcvbnCommonPackage.adjacencyGraphs,
			dictionary: {
				...zxcvbnCommonPackage.dictionary,
				...zxcvbnEnPackage.dictionary,
			},
		};

		zxcvbnOptions.setOptions(options);

		if (password !== null && password !== undefined) {
			setPasswordScore(zxcvbn(password).score);
		}
	}, [password]);

	return (
		<>
			<progress value={passwordScore} max="4"></progress>
			<div className="strengthText">
				<p>Strength:</p>
				<p>{strength[passwordScore]}</p>
			</div>
		</>
	);
}

export default ProgressBar;
