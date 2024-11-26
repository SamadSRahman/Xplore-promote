export function getScreenPath(name){
   return name.toLowerCase().replace(/ /g, "_");

}
export function getScreenName(path){
    let newPath = path.split("_").map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");

    return newPath
}

export const isContactUs = () => {
    const screens = localStorage.getItem("screens")
    if(screens){
        const screensArray = JSON.parse(screens)
        const contactUsScreen = screensArray.find((ele) => ele.path === "contact_us_screen")
        if(contactUsScreen){
            return true
        }
    }
    return false
}
