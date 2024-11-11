export function getScreenPath(name){
   return name.toLowerCase().replace(/ /g, "_");

}
export function getScreenName(path){
    let newPath = path.split("_").map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");

    return newPath
}
