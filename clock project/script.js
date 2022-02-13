//start - end 130222

const secondHand = document.querySelector('.second');
const minuteHand = document.querySelector(".minute");
const hourHand = document.querySelector(".hour");

update();
setInterval(update, 1000);

function update() {
	const now = new Date();
	
	//seconds
	let secondsDegrees = now.getSeconds() * 6;
	secondHand.style.transform = `translate(-50%, -100%) rotate(${secondsDegrees}deg)`;

	//minutes
	let minutesDegrees = now.getMinutes() * 6;
	minuteHand.style.transform = `translate(-50%, -100%) rotate(${minutesDegrees}deg)`;

	//hours
	let hoursDegrees = (now.getHours() % 12) * 30;
	hourHand.style.transform = `translate(-50%, -100%) rotate(${hoursDegrees}deg)`;
}