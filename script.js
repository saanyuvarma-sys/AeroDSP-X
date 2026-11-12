document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });
    navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }));
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else revealItems.forEach(item => item.classList.add("in-view"));

  const links = document.querySelectorAll(".nav-links a");
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id));
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    document.querySelectorAll("main section[id]").forEach(section => sectionObserver.observe(section));
  }

  // Browser-side teaching visualization; not HDL simulation output.
  const inputPath = document.getElementById("inputPath");
  const outputPath = document.getElementById("outputPath");
  const signalMode = document.getElementById("signalMode");
  const regenerate = document.getElementById("regenerate");
  const scenarioButtons = document.querySelectorAll(".scenario-btn");
  if (!inputPath || !outputPath) return;
  const coeff = [117,1248,5277,9742,9742,5277,1248,117].map(v => v / 32768);
  let mode = "noise", seed = 7;
  function random(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
  function buildSignal(){
    const raw=[];
    for(let i=0;i<100;i++){
      const base=.43*Math.sin(i*.19)+.18*Math.sin(i*.047+1.1);
      let value=base;
      if(mode==="noise") value+=(random()-.5)*.58;
      if(mode==="spike") value+=(i>42&&i<49?.92*Math.sin((i-42)/7*Math.PI):0)+(random()-.5)*.12;
      if(mode==="clean") value+=(random()-.5)*.07;
      raw.push(value);
    }
    const filtered=raw.map((_,i)=>{let sum=0;for(let k=0;k<coeff.length;k++)sum+=coeff[k]*(raw[i-k]??0);return sum;});
    return {raw,filtered};
  }
  function toPath(values){
    const width=900,height=270,mid=height/2,scale=95;
    return values.map((v,i)=>{const x=i/(values.length-1)*width;const y=mid-Math.max(-1.25,Math.min(1.25,v))*scale;return(i===0?"M":"L")+x.toFixed(1)+" "+y.toFixed(1);}).join(" ");
  }
  function render(){
    const {raw,filtered}=buildSignal();
    inputPath.setAttribute("d",toPath(raw));outputPath.setAttribute("d",toPath(filtered));
    signalMode.textContent={noise:"SCENARIO: SENSOR NOISE",spike:"SCENARIO: TRANSIENT SPIKE",clean:"SCENARIO: CLEAN SIGNAL"}[mode];
  }
  scenarioButtons.forEach(button=>button.addEventListener("click",()=>{
    mode=button.dataset.mode;scenarioButtons.forEach(item=>item.classList.toggle("active",item===button));seed+=13;render();
  }));
  if(regenerate)regenerate.addEventListener("click",()=>{seed+=97;render();});
  render();
});