var r=Object.defineProperty,a=t=>r(t,"__esModule",{value:!0}),o=(t,e)=>{a(t);for(var i in e)r(t,i,{get:e[i],enumerable:!0})};o(exports,{default:()=>h});const s=t=>t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement;class n{constructor(t){this.isPredicating=!1;if(!t.target)throw new Error("config.target must be provided.");this.config=t,this.getTarget()}get isReady(){return!!this.target}get currentValue(){return this.target&&this.target.value}get composerValue(){return this.composerInput.value}get valueAfterPredict(){const[,...t]=this.currentValue.split(this.config.triggerKey);return t.join("")}getTarget(){const t=document.getElementById(this.config.target);s(t)&&(this.target=t)}attach(){if(this.isReady||this.getTarget(),this.isReady){const t=this.target.cloneNode(!1);if(s(t)){this.composerInput=t;const e=this.checkParentPosition();if(e)this.insertComposerWithStyles(),this.attachElementEvent();else{const i=document.createElement("div");i.style.position="relative",this.target.parentNode.insertBefore(i,this.target),i.appendChild(this.target),this.insertComposerWithStyles(),this.attachElementEvent()}}}}clear(){this.composerInput.value="",this.predicted="",this.isPredicating=!1}insertPredictValue(t){this.predicted=t,this.predicted?this.composerInput.value=this.valueBeforePredict+this.predicted:this.clear()}async callPredict(){return typeof this.config.predict!="function"?void 0:this.config.predict instanceof Promise?this.config.predict(this):Promise.resolve(this.config.predict(this))}dispatchChangeOnTarget(t=""){try{const i=Object.getOwnPropertyDescriptor(window[this.target.constructor.name].prototype,"value").set;i.call(this.target,t)}catch(i){this.target.value=t}const e=new Event("input",{bubbles:!0});this.target.dispatchEvent(e)}insertComposerWithStyles(){this.target.parentElement.insertBefore(this.composerInput,this.target);const{color:t}=getComputedStyle(this.composerInput);this.composerInput.style.position="absolute",this.composerInput.style.color=t.replace(")",", 0.6)").replace("rgb","rgba"),this.composerInput.style.pointerEvents="none";for(const e of c)this.composerInput.removeAttribute(e);this.composerInput.setAttribute("aria-hidden","true"),this.composerInput.setAttribute("aria-readonly","true"),this.target.style.position="relative",this.target.style.background="transparent"}checkParentPosition(){const t=getComputedStyle(this.target.parentElement),e=this.target.parentElement.childElementCount;return t.position==="relative"&&e===1}handleKeyDown(t){t.key==="Backspace"&&(this.insertPredictValue.call(this,""),this.isPredicating=!1),t.key==="Tab"&&(this.isPredicating&&this.predicted&&(t.preventDefault(),this.dispatchChangeOnTarget(this.valueBeforePredict+this.predicted),this.clear()))}handleInput(t){if(this.isPredicating){if(t.data===this.config.triggerKey){this.clear();return}this.composerInput.value.startsWith(this.target.value)||this.callPredict().then(e=>{e?this.insertPredictValue(e):this.clear()})}else t.data===this.config.triggerKey&&(this.isPredicating=!0,this.valueBeforePredict=this.target.value,this.config.defaultPredictValue?this.insertPredictValue(this.config.defaultPredictValue):this.callPredict().then(e=>{e?this.insertPredictValue(e):this.clear()}))}attachElementEvent(){this.target.addEventListener("keydown",this.handleKeyDown.bind(this)),this.target.addEventListener("input",this.handleInput.bind(this))}}var h=n;module.exports=n;const c=["id","value","placeholder","name","data-testid","type"];
