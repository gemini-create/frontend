    const translateFrom = document.getElementById("languageFrom");
    console.log(translateFrom.value);

    const translateTo = document.getElementById("languageTo");
    console.log(translateTo.value);

    const textToTranslate = document.querySelector(".translate-from textarea")
    console.log(textToTranslate.value);

    const translatedText = document.querySelector(".translate-to textarea");
    console.log(translatedText.value);

    const controls=document.querySelectorAll(".control");
    console.log(controls);

    const doTranslation = document.querySelector(".translate-Btn");
    doTranslation.addEventListener("click",()=>{
    const text = textToTranslate.value.trim();
    // const fromLang = translateFrom.value.toLowerCase();
    // const toLang = translateTo.value.toLowerCase();
const fromLangFull = translateFrom.value;  // e.g. "en-US"
    const toLangFull = translateTo.value;      // e.g. "ur-PK"

    // API needs only first 2 letters
    const fromLang = fromLangFull.split("-")[0];  // "en"
    const toLang = toLangFull.split("-")[0];      // "ur"

    if (!text) {
        alert("Please enter text to translate!");
        return;
    }

        // MyMemory Translation API URL
    let apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            translatedText.value = data.responseData.translatedText;
                })
        .catch(err => {
            console.error(err);
            alert("Translation failed. Please try again.");
                });
            });

            //Controls
    controls.forEach(button=>{
        button.addEventListener("click",(e)=>{
            console.log(e.target);
            if(button.classList.contains("switch"))
            {
                let exchange = translateFrom.value;
                translateFrom.value = translateTo.value;
                translateTo.value = exchange;
            }
            else if(button.classList.contains("copy"))
            {
                let tooltip = new bootstrap.Tooltip(button);

                if(button.classList.contains("translate"))
                {
                    navigator.clipboard.writeText(textToTranslate.value)
                    .then(()=>{
                        button.setAttribute("data-bs-original-title", "Copied!");
                        tooltip.show();

                        setTimeout(() => {
                        button.setAttribute("data-bs-original-title", "Copy to clipboard");
                        }, 1000);
                         console.log("Copied Successfully!");
                       })
                    .catch(err=>{
                        console.log("Error copying:", err);
                    });
                }
                else
                {
                    navigator.clipboard.writeText(translatedText.value)
                    .then(()=>{
                        button.setAttribute("data-bs-original-title", "Copied!");
                        tooltip.show();

                        setTimeout(()=>{
                             button.setAttribute("data-bs-original-title", "Copy to clipboard");
                        }, 1000);
                        console.log("Copied Successfully!");
                    })
                    .catch(err=>{
                        console.log("Error copying:", err);
                    });
                }
            } 
            else
            {
            if(button.classList.contains("volumeFrom"))
                {
                    if(!textToTranslate.value){
                        return;
                    }
                    const utteranceFrom = new SpeechSynthesisUtterance(textToTranslate.value);
                    console.log(utteranceFrom);
                    utteranceFrom.lang = translateFrom.value;
                    console.log(utteranceFrom.lang);
                    speechSynthesis.speak(utteranceFrom);
  
                } 
            else if(button.classList.contains("volumeTo")){
                if(!translatedText.value){
                        return;
                }
                    const utteranceTo = new SpeechSynthesisUtterance(translatedText.value);
                    utteranceTo.lang = translateTo.value;
                    speechSynthesis.speak(utteranceTo);
                }
                else{
                    console.log("error");
                }
            }
        });
    });