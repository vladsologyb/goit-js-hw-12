import{S as L,a as q,i as c}from"./assets/vendor-483db976.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();function S(r){return r.hits.map(({webformatURL:t,tags:i,largeImageURL:o,likes:e,views:s,comments:n,downloads:b})=>` <li>
        <a class="gallery-link" href="${o}">
        <img class="gallery-image" src="${t}" 
        alt="${i}"
        data-source="${o}">
        <div class="image-info">
                            <ul class="image-info-list">
                                <li class="image-item">
                                    <h2 class="image-text">Likes</h2>
                                    <p class="image-quantity">${e}</p>
                                </li>
                                <li class="image-item">
                                    <h2 class="image-text">Views</h2>
                                    <p class="image-quantity">${s}</p>
                                </li>
                                <li class="image-item">
                                    <h2 class="image-text">Comments</h2>
                                    <p class="image-quantity">${n}</p>
                                </li>
                                <li class="image-item">
                                    <h2 class="image-text">Downloads</h2>
                                    <p class="image-quantity">${b}</p>
                                </li>
                            </ul>
                        </div>
      </li>`).join("")}function v(){return new L(".gallery-link",{captionsData:"alt",captionDelay:250})}const p=15;async function $(r,t){const i=new URLSearchParams({key:"42802195-5d597efdcf1a19b578d57b87f",q:r,per_page:p,page:t}),o="https://pixabay.com/api/",e=await q.get(`${o}?${i}`);return{hits:e.data.hits,totalHits:e.data.totalHits}}const d=document.querySelector(".form"),y=document.querySelector(".gallery"),a=document.querySelector(".loader"),m=document.querySelector(".load-more");let u,l=1,g="",f=1;d.addEventListener("submit",w);m.addEventListener("click",x);function w(r){r.preventDefault();const t=d.elements.search.value;f=l,t!==g&&(l=1,g=t),y.innerHTML="",a.style.display="block",m.style.display="none",h(t,l),d.reset()}function x(){a.style.display="block",l+=1,l===f+1?h(g,l):console.log("Сторінка була змінена .")}async function h(r,t){try{const i=await $(r,t);if(r.trim())if(i.hits.length===0){c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"center"}),a.style.display="none";return}else{const o=S(i);y.insertAdjacentHTML("beforeend",o),a.style.display="none",u?u.refresh():u=v(),P(),f=t;const e=i.totalHits,s=Math.ceil(e/p);if(t>=s)return m.style.display="none",c.error({title:"Error",message:"We're sorry, there are no more images to load",position:"topRight"});m.style.display="block"}else{c.error({message:"Заповніть це поле!",messageColor:"#FFFFFF",backgroundColor:"#B51B1B",position:"topRight"}),a.style.display="none";return}}catch{a.style.display="none",c.error({title:"Error",message:"Fetch error. Please try again later.",position:"center"})}}function P(){const r=y.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:2*r,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
