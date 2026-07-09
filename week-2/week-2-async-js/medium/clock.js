
// Can you make it so that it updates every second, and shows time in the following formats - 

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH: MM::SS AM / PM(Eg 01: 45: 23 PM)

// let time = new Date();

// console.log(time.toLocaleTimeString('en-US', { hour12: false })); // HH:MM:SS format
// console.log(time.toLocaleTimeString('en-US', { hour12: true })); // HH:MM:SS AM/PM format

let counter = 0;

const updateClock = () => {
	const now = new Date();

	// 24-hour format
	const hours24 = now.getHours().toString().padStart(2, "0");
	const minutes = now.getMinutes().toString().padStart(2, "0");
	const seconds = now.getSeconds().toString().padStart(2, "0");

	// 12-hour format
	const hours12 = (((now.getHours() + 11) % 12) + 1)
		.toString()
		.padStart(2, "0");
	const ampm = now.getHours() >= 12 ? "PM" : "AM";

	console.log(`24-hour format: ${hours24}:${minutes}:${seconds}`);
	console.log(`12-hour format: ${hours12}:${minutes}:${seconds} ${ampm}`);

	setTimeout(updateClock, 1000);
};

updateClock();
