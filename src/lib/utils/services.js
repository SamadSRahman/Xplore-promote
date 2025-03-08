export function getScreenPath(name) {
  return name.toLowerCase().replace(/ /g, "_");
}
export function getScreenName(path) {
  let newPath = path
    .split("_")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  return newPath;
}

export const isContactUs = () => {
  const screens = localStorage.getItem("screens");
  if (screens) {
    const screensArray = JSON.parse(screens);
    const contactUsScreen = screensArray.find(
      (ele) => ele.path === "contact_us_screen"
    );
    if (contactUsScreen) {
      return true;
    }
  }
  return false;
};

export const fontWeights = [
  { text: "Light", weight: 300 },
  { text: "Regular", weight: 400 },
  { text: "Medium", weight: 500 },
  { text: "Bold", weight: 700 },
];


export const convertDate = (data) =>{
  const date = new Date(data);

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
  timeZone: 'UTC' // Remove this line to show in local time
};

const readableDate = date.toLocaleString('en-US', options);
// Outputs: "March 7, 2025, 6:30 PM"
return readableDate
}