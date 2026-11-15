const places = [
 {id:1,name:"Hồ Hoàn Kiếm",city:"Hà Nội",type:"văn hóa",desc:"Dạo quanh hồ, ngắm Tháp Rùa và phố cổ.",price:"Miễn phí",icon:"🏞️",lat:21.0285,lng:105.8542},
 {id:2,name:"Văn Miếu – Quốc Tử Giám",city:"Hà Nội",type:"văn hóa",desc:"Di tích lịch sử và văn hóa nổi tiếng.",price:"Vé tham khảo 70.000đ",icon:"🏛️",lat:21.0270,lng:105.8355},
 {id:3,name:"Phố cổ Hà Nội",city:"Hà Nội",type:"ẩm thực",desc:"Khám phá phố nghề và ẩm thực địa phương.",price:"Tùy trải nghiệm",icon:"🍜",lat:21.0340,lng:105.8500},
 {id:4,name:"Lăng Chủ tịch Hồ Chí Minh",city:"Hà Nội",type:"văn hóa",desc:"Địa điểm lịch sử quan trọng của Thủ đô.",price:"Miễn phí khu vực lăng",icon:"🇻🇳",lat:21.0368,lng:105.8348},
 {id:5,name:"Vườn quốc gia Ba Vì",city:"Hà Nội",type:"thiên nhiên",desc:"Rừng xanh, không khí trong lành và cung đường đẹp.",price:"Theo vé vào cổng",icon:"🌲",lat:21.0800,lng:105.3700},
 {id:6,name:"Cầu Long Biên",city:"Hà Nội",type:"check-in",desc:"Cây cầu lịch sử với góc ngắm sông Hồng.",price:"Miễn phí",icon:"🌉",lat:21.0435,lng:105.8610},
 {id:7,name:"Công viên Thủ Lệ",city:"Hà Nội",type:"gia đình",desc:"Không gian vui chơi phù hợp cho gia đình.",price:"Theo vé vào cổng",icon:"🦒",lat:21.0260,lng:105.8090},
 {id:8,name:"Hồ Tây",city:"Hà Nội",type:"thiên nhiên",desc:"Ngắm hoàng hôn, dạo hồ và thưởng thức món ngon.",price:"Miễn phí",icon:"🌅",lat:21.0583,lng:105.8230}
];
let map, markers = {}, saved = JSON.parse(localStorage.getItem("vietgo-saved")||"[]"), interests = new Set(["văn hóa"]), activePanel="home";
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
function toast(msg){const el=$("#toast");el.textContent=msg;el.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove("show"),2600)}
function initMap(){
 if(!window.L){$("#map").innerHTML='<div style="padding:100px 30px">Không tải được bản đồ. Hãy kiểm tra kết nối Internet.</div>';return}
 map=L.map("map",{zoomControl:false}).setView([21.0285,105.8542],13);
 L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; OpenStreetMap'}).addTo(map);
 L.control.zoom({position:"bottomleft"}).addTo(map);
 places.forEach(p=>{
   const marker=L.marker([p.lat,p.lng]).addTo(map).bindPopup(`<div class="popup-title">${p.icon} ${p.name}</div><div class="popup-desc">${p.desc}</div><p style="font-size:11px;color:#0786ad">${p.price}</p><button onclick="savePlace(${p.id})" style="border:0;background:#e8f8ff;color:#0878aa;padding:7px 10px;border-radius:8px">♡ Lưu yêu thích</button>`);
   markers[p.id]=marker;
 });
}
function renderPlaces(list=places){
 const root=$("#placeList");
 if(!list.length){root.innerHTML='<p class="muted">Chưa tìm thấy địa điểm phù hợp. Hãy thử từ khóa khác.</p>';return}
 root.innerHTML=list.map(p=>`<article class="place-card"><div class="place-image">${p.icon}</div><div class="place-info"><h4>${p.name}</h4><p>${p.desc}</p><div class="place-meta">📍 ${p.city} · ${p.price}</div></div><button class="heart ${saved.includes(p.id)?"saved":""}" onclick="savePlace(${p.id})" aria-label="Lưu ${p.name}">${saved.includes(p.id)?"♥":"♡"}</button></article>`).join("");
 root.querySelectorAll(".place-card").forEach((card,i)=>card.addEventListener("click",e=>{if(e.target.closest(".heart"))return;const p=list[i];if(map){map.setView([p.lat,p.lng],15);markers[p.id]?.openPopup()}}));
}
function savePlace(id){saved=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];localStorage.setItem("vietgo-saved",JSON.stringify(saved));renderPlaces(filterPlaces());renderSaved();toast(saved.includes(id)?"Đã lưu địa điểm yêu thích ❤️":"Đã bỏ khỏi danh sách yêu thích")}
function filterPlaces(){const q=$("#searchInput").value.trim().toLowerCase();return places.filter(p=>(!q||`${p.name} ${p.city} ${p.desc} ${p.type}`.toLowerCase().includes(q))&&(!interests.size||interests.has(p.type)||q.length>0))}
function search(){const q=$("#searchInput").value.trim().toLowerCase();const list=places.filter(p=>`${p.name} ${p.city} ${p.desc} ${p.type}`.toLowerCase().includes(q));renderPlaces(list);if(list.length&&map){map.setView([list[0].lat,list[0].lng],14);markers[list[0].id].openPopup()}if(!list.length)toast("Chưa tìm thấy địa điểm. Hãy thử từ khóa khác.");$("#panelTitle").textContent=q?`Kết quả tìm kiếm (${list.length})`:"Khám phá quanh bạn"}
function renderSaved(){const root=$("#savedList");const list=places.filter(p=>saved.includes(p.id));root.innerHTML=list.length?list.map(p=>`<article class="place-card"><div class="place-image">${p.icon}</div><div class="place-info"><h4>${p.name}</h4><p>${p.desc}</p><div class="place-meta">${p.city}</div></div><button class="heart saved" onclick="savePlace(${p.id})">♥</button></article>`).join(""):'<p class="muted">Bạn chưa lưu địa điểm nào. Nhấn ♡ ở một địa điểm để lưu lại nhé.</p>'}
function openPanel(name){
 activePanel=name; $$(".nav-hex").forEach(b=>b.classList.toggle("active",b.dataset.panel===name));
 if(name==="ai"){$("#aiDialog").showModal();return}
 if(name==="itinerary"){$("#panelTitle").textContent="Lịch trình của bạn";$("#panelContent").innerHTML='<div class="welcome-card"><span class="pill">🧭 Lịch trình</span><h2>Lên kế hoạch cho hành trình mới</h2><p>Để AI gợi ý lịch trình theo ngày, ngân sách và sở thích của bạn.</p><button class="primary-button" id="planFromPanel">Tạo lịch trình với AI</button></div><h3>Gợi ý điểm đến để thêm vào lịch trình</h3><div id="placeList" class="place-list"></div>';renderPlaces();$("#planFromPanel").onclick=()=>$("#aiDialog").showModal()}
 else if(name==="places"){$("#panelTitle").textContent="Tất cả địa điểm";$("#panelContent").innerHTML='<p class="muted">Khám phá các địa điểm phù hợp với chuyến đi của bạn.</p><div id="placeList" class="place-list"></div>';renderPlaces(places)}
 else{$("#panelTitle").textContent="Khám phá quanh bạn";$("#panelContent").innerHTML=originalPanel;renderPlaces(filterPlaces());wireChips()}
}
const originalPanel=$("#panelContent").innerHTML;
function wireChips(){$$("#interestChips .chip").forEach(ch=>ch.onclick=()=>{const v=ch.dataset.interest;if(interests.has(v)){interests.delete(v);ch.classList.remove("selected")}else{interests.add(v);ch.classList.add("selected")}renderPlaces(filterPlaces())})}
function makePlan(){
 const destination=$("#aiDestination").value.trim()||"Hà Nội";const days=Number($("#aiDays").value);const style=$("#aiStyle").value;const matched=places.filter(p=>p.type===style);const chosen=[...matched,...places.filter(p=>p.type!==style)].slice(0,Math.min(days*2,6));
 const result=$("#aiResult");result.hidden=false;
 result.innerHTML=`<h3>✨ Gợi ý hành trình ${days} ngày tại ${destination}</h3><p><b>Phong cách:</b> ${style}. <b>Ngân sách:</b> ${$("#aiBudget").selectedOptions[0].text}.</p>${Array.from({length:days},(_,i)=>`<p><b>Ngày ${i+1}:</b> ${chosen.slice(i*2,i*2+2).map(p=>p.name).join(" → ")||"Tự do khám phá địa điểm phù hợp"}.</p>`).join("")}<p><b>Mẹo từ VietGo:</b> Kiểm tra giờ mở cửa, thời tiết và phương tiện trước khi đi. Chi phí thực tế có thể thay đổi theo thời điểm.</p><button class="primary-button" id="showPlanMap">Hiển thị điểm đến trên bản đồ</button>`;
 $("#showPlanMap").onclick=()=>{if(map&&chosen.length)map.setView([chosen[0].lat,chosen[0].lng],12);$("#aiDialog").close();toast("Đã hiển thị điểm đến gợi ý trên bản đồ")};
}
initMap();renderPlaces();wireChips();renderSaved();
$("#searchButton").onclick=search;$("#searchInput").addEventListener("keydown",e=>{if(e.key==="Enter")search()});
$("#menuToggle").onclick=()=>{$("#sidePanel").scrollIntoView({behavior:"smooth"});toast("Bảng điều khiển VietGo AI")};
$("#openPanel").onclick=()=>{$("#sidePanel").scrollIntoView({behavior:"smooth"});toast("Khám phá các chức năng ở bảng điều khiển")};
$("#closePanel").onclick=()=>{$("#map").scrollIntoView({behavior:"smooth"})};
$$(".nav-hex").forEach(b=>b.onclick=()=>openPanel(b.dataset.panel));
$("#aiDialog").querySelector(".modal-close")?.addEventListener("click",()=>$("#aiDialog").close());
$("#generatePlan").onclick=makePlan;
$("#vrBtn").onclick=()=>$("#vrDialog").showModal();$("#vrExplore").onclick=()=>{$("#vrDialog").close();openPanel("places")};
$("#savedBtn").onclick=()=>{renderSaved();$("#savedDialog").showModal()};
$("#vietnamBtn").onclick=()=>{map?.setView([16.0,106.0],5);toast("Đang xem bản đồ Việt Nam")};
$("#trailerBtn").onclick=()=>toast("Khu vực video giới thiệu sẽ được tích hợp ở phiên bản tiếp theo.");
$("#mapTypeBtn").onclick=()=>toast("Bản demo dùng bản đồ OpenStreetMap; chế độ 3D/4D cần tích hợp dịch vụ bản đồ chuyên dụng.");
$("#showAll").onclick=()=>{interests.clear();renderPlaces(places);$("#panelTitle").textContent="Tất cả địa điểm";toast("Đang hiển thị tất cả địa điểm")};
$("#locateBtn").onclick=()=>{if(!navigator.geolocation){toast("Trình duyệt không hỗ trợ định vị.");return}navigator.geolocation.getCurrentPosition(pos=>{const {latitude,longitude}=pos.coords;map?.setView([latitude,longitude],14);L.circleMarker([latitude,longitude],{radius:9,color:"#fff",weight:3,fillColor:"#168ed0",fillOpacity:1}).addTo(map).bindPopup("Vị trí hiện tại của bạn").openPopup();$("#locationLabel").textContent="Đang xem vị trí hiện tại";toast("Đã xác định vị trí hiện tại")},()=>toast("Không lấy được vị trí. Hãy cấp quyền định vị cho trình duyệt."),{enableHighAccuracy:true,timeout:10000})};
window.savePlace=savePlace;
