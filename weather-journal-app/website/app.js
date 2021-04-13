/* Global Variables */
const apiKey='8dd55cd83e819308a10d354b1cb6f8d5'; 
const baseUrl=`http://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Weather Get Using Fetch
const weatherGet= async(Url='',data={})=>{
    const url=baseUrl+Url
    const response=await fetch(url,{
        method:'GET',
        credentials:'same-origin',
    });

    try{
        const updateData=await response.json();
        console.log(updateData);
        return updateData;
    }
    catch(error){
        console.log("error",error);
    }
};

// Post Data Of Weather Using Fetch
const dataOfWeather = async (link, data = {}) => {
    const response = await fetch(link, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};

//Function For Generate Button
document.getElementById("generate").addEventListener('click',async()=>{
    var Url=document.getElementById("zip").value
    const weatherRspoData=await weatherGet(Url);
    const data = {
        temperature: weatherRspoData.main.temp,
        date: newDate,
        userResponse: document.getElementById("feelings").value
    }
    await dataOfWeather('/addData',data)
    uiUpdating();
});

// Update ui
const uiUpdating = async () => {
    const weatherRspoData = await fetch('/getData')
    const jsonRespo = await weatherRspoData.json()
    document.getElementById('date').innerHTML = `Date Today Is: ${jsonRespo.date}`
    document.getElementById('content').innerHTML = `Your Feel Is: ${jsonRespo.userResponse}`
    document.getElementById('temp').innerHTML = `The Temp Today Is: ${jsonRespo.temperature}`
};




