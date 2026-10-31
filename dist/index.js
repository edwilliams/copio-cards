import{a as ie,b as ae,c as de,d as he,e as ge,f as me,g as ue,h as fe,i as xe,j as be,k as ye,l as ve}from"./chunk-QWG526KG.js";import{a as E,b as R,c as G,d as J,e as X,f as Y,g as ee,h as te,i as se,m as a,n as oe,o as re}from"./chunk-QVAFNZWO.js";import{a as we}from"./chunk-UCV3MQ6I.js";import{b as r,c as b}from"./chunk-XEN5VKAV.js";import"./chunk-V6E2SSSW.js";import{a as Pe}from"./chunk-A5G52Q2W.js";import{a as ke}from"./chunk-PVNRK4OH.js";import{a as Oe}from"./chunk-KIMVF5UG.js";import"./chunk-PUJYN435.js";import{a as m}from"./chunk-DGGK5KEX.js";import"./chunk-CWCS22CQ.js";import{a as u}from"./chunk-B2EK6INF.js";import"./chunk-4GEMGDRU.js";import{a as $,b as A,c as O,e as k,f as P,g as I,l as c}from"./chunk-N7Q34F2P.js";import{a as q}from"./chunk-SH4P4XSZ.js";import{a as Z}from"./chunk-HN3336JN.js";import{a as T}from"./chunk-36F637QU.js";import{a as w}from"./chunk-4JPEWIT4.js";import{a as F}from"./chunk-B7HT2X67.js";import{a as V}from"./chunk-N4R55VRR.js";import{a as Q}from"./chunk-E7JYVRJA.js";import{a as H}from"./chunk-YHLOPPXM.js";import{b as g}from"./chunk-BKZEOOH4.js";import{a as p,b as Se,c as Ce,d,e as h}from"./chunk-B5BEYYR2.js";import{c as Te,d as $e,e as Ae,f as y}from"./chunk-K6YP7EET.js";import{a as ne}from"./chunk-IUBYFIV6.js";import{a as le,b as ce,c as pe,d as i}from"./chunk-V2FP4EEH.js";import{a as N,b as D,c as _,d as L,e as M,f as U,g as z,h as B,i as W,j,k as K}from"./chunk-G65H4ZTJ.js";import{a as C}from"./chunk-OI4WCW7E.js";import{a as S}from"./chunk-LI54F6PA.js";import"./chunk-4C666HHU.js";var l=class extends b{#e=null;static properties={isOpen:{type:Boolean,state:!0},docId:{type:String,state:!0},docName:{type:String,state:!0},pages:{type:Array,state:!0},lang:{type:String,state:!0},step:{type:String,state:!0},progress:{type:Number,state:!0},statusMessage:{type:String,state:!0},resultText:{type:String,state:!0},confidence:{type:Number,state:!0},copied:{type:Boolean,state:!0}};createRenderRoot(){return this}disconnectedCallback(){super.disconnectedCallback(),this.#e&&(this.#e.abort(),this.#e=null),h(),this.isOpen=!1}constructor(){super(),this.isOpen=!1,this.docId="",this.docName="",this.pages=[],this.lang="eng",this.step="processing",this.progress=0,this.statusMessage="Starting OCR engine...",this.resultText="",this.confidence=0,this.copied=!1,this._pageIndex=null,this.#e=null}open(e,s,t,o="eng"){this._pageIndex=null,this._openInternal(e,s,t,o)}openPage(e,s,t,o,n="eng"){this._pageIndex=o,this._openInternal(e,s,[t],n)}_openInternal(e,s,t,o){if(this.#e&&(this.#e.abort(),this.#e=null),this.docId=e,this.docName=s||"Document",this.pages=t||[],this.lang=o,this.progress=0,this.resultText="",this.confidence=0,this.copied=!1,(this.pages||[]).filter(x=>x.type!=="markdown"&&x.src).length===0){this.step="empty",this.statusMessage="This document does not contain any image pages for text recognition.",this.isOpen=!0;return}this.step="processing",this.statusMessage="Starting OCR engine...",this.isOpen=!0,this.startOcr(o)}cancel=()=>{this.#e&&(this.#e.abort(),this.#e=null),this.close()};close=()=>{this.#e&&(this.#e.abort(),this.#e=null),this.isOpen=!1};async startOcr(e="eng"){this.#e&&(this.#e.abort(),this.#e=null),this.#e=new AbortController;let{signal:s}=this.#e;try{let t=await d(this.pages,{lang:e,abortSignal:s,onPageProgress:({overallProgress:o,message:n})=>{this.isOpen&&!s.aborted&&(this.progress=Math.round((o||0)*100),this.statusMessage=n)}});this.isOpen&&!s.aborted&&(this.step="done",this.resultText=t.combinedText||"",this.confidence=t.averageConfidence||0,i.success("Text recognition complete"))}catch(t){if(t.name==="AbortError"||s.aborted)return;console.error("Document OCR Error:",t),this.isOpen&&(this.step="error",this.statusMessage=t.message||"Text recognition failed",i.error(t.message||"Text recognition failed"))}finally{this.#e?.signal===s&&(this.#e=null)}}handleLangChange=e=>{let s=e.target.value;this.lang=s,this.step="processing",this.progress=0,this.statusMessage="Starting OCR engine with new language...",this.startOcr(s)};handleTextInput=e=>{this.resultText=e.target.value};copyText=async()=>{if(this.resultText)try{await navigator.clipboard.writeText(this.resultText),this.copied=!0,i.success("Copied text to clipboard"),setTimeout(()=>{this.copied=!1},2e3)}catch(e){console.error("Failed to copy text:",e),i.error("Failed to copy text to clipboard")}};downloadMarkdown=()=>{if(!this.resultText)return;let e=(this.docName||"document").replace(/[/\\?%*:|"<>]/g,"_"),s=new Blob([this.resultText],{type:"text/markdown;charset=utf-8"}),t=URL.createObjectURL(s),o=document.createElement("a");o.href=t,o.download=`${e}-ocr.md`,o.click(),URL.revokeObjectURL(t),i.success(`Exported OCR markdown (${e}-ocr.md)`)};downloadText=()=>{if(!this.resultText)return;let e=(this.docName||"document").replace(/[/\\?%*:|"<>]/g,"_"),s=new Blob([this.resultText],{type:"text/plain;charset=utf-8"}),t=URL.createObjectURL(s),o=document.createElement("a");o.href=t,o.download=`${e}-ocr.txt`,o.click(),URL.revokeObjectURL(t),i.success(`Exported OCR text (${e}-ocr.txt)`)};saveAsNote=()=>{if(!this.resultText||!this.docId)return;let e={docId:this.docId,content:this.resultText,pageIndex:this._pageIndex};this.dispatchEvent(new CustomEvent("note:save",{bubbles:!0,composed:!1,detail:e})),i.success("Saved OCR text as note"),this.close()};get _isSinglePage(){return this._pageIndex!==null}get _dialogLabel(){return this._isSinglePage?`Extract Text \u2014 ${this.docName} (Page ${this._pageIndex+1})`:`Extract All Text \u2014 ${this.docName}`}render(){return this.isOpen?r`
      <sl-dialog
        label="${this._dialogLabel}"
        open
        style="--width: 85vw"
        @sl-after-hide=${this.close}
      >
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #e2e8f0; flex-wrap: wrap; gap: 8px;">
          <sl-select
            size="small"
            value=${this.lang}
            @sl-change=${this.handleLangChange}
            style="min-width: 180px;"
          >
            ${p.map(e=>r`<sl-option value=${e.code}>${e.flag} ${e.label}</sl-option>`)}
          </sl-select>

          ${this.step==="done"?r`
                <sl-badge
                  variant=${this.confidence>=75?"success":this.confidence>=50?"warning":"danger"}
                >
                  ${this.confidence}% Avg Confidence
                </sl-badge>
              `:""}
        </div>

        ${this.step==="empty"?r`
              <div style="padding: 2.5rem 1rem; text-align: center; color: #64748b;">
                <sl-icon name="file-earmark-x" style="font-size: 2.5rem; margin-bottom: 0.5rem; color: #94a3b8;"></sl-icon>
                <p style="margin: 0; font-size: 1rem; color: #334155; font-weight: 500;">${this.statusMessage}</p>
                <p style="font-size: 0.85rem; margin-top: 0.5rem; color: #64748b;">Add or import an image page before extracting text.</p>
              </div>
            `:""}

        ${this.step==="processing"?r`
              <div style="padding: 2.5rem 1rem; text-align: center;">
                <div style="font-size: 1.1rem; color: #0284c7; font-weight: 600; margin-bottom: 1rem;">
                  ${this.statusMessage}
                </div>
                <sl-progress-bar value=${this.progress}></sl-progress-bar>
                <div style="font-size: 0.82rem; color: #64748b; margin-top: 0.75rem;">
                  100% Client-Side WebAssembly OCR — zero cloud servers
                </div>
              </div>
            `:""}

        ${this.step==="error"?r`
              <div style="padding: 2rem; text-align: center; color: #ef4444;">
                <sl-icon name="x-circle-fill" style="font-size: 2rem;"></sl-icon>
                <p style="margin-top: 0.5rem;">${this.statusMessage}</p>
              </div>
            `:""}

        ${this.step==="done"?r`
              <div>
                <sl-textarea
                  rows="14"
                  .value=${this.resultText}
                  @input=${this.handleTextInput}
                  placeholder="Extracted transcript..."
                ></sl-textarea>
              </div>
            `:""}

        ${this.step==="processing"?r`
              <sl-button slot="footer" variant="default" @click=${this.cancel}>
                <sl-icon slot="prefix" name="x-lg"></sl-icon>
                Cancel
              </sl-button>
            `:""}
        ${this.step==="empty"||this.step==="error"?r`
              <sl-button slot="footer" variant="default" @click=${this.close}>
                Close
              </sl-button>
            `:""}
        ${this.step==="done"?r`
              <sl-button slot="footer" variant="default" @click=${this.close}>
                Close
              </sl-button>
              <sl-button slot="footer" variant="default" @click=${this.copyText}>
                <sl-icon slot="prefix" name=${this.copied?"check":"clipboard"}></sl-icon>
                ${this.copied?"Copied!":"Copy All"}
              </sl-button>
              <sl-button slot="footer" variant="default" @click=${this.downloadText}>
                <sl-icon slot="prefix" name="download"></sl-icon>
                Download .txt
              </sl-button>
              <sl-button slot="footer" variant="default" @click=${this.downloadMarkdown}>
                <sl-icon slot="prefix" name="download"></sl-icon>
                Download .md
              </sl-button>
              <sl-button slot="footer" variant="primary" @click=${this.saveAsNote}>
                <sl-icon slot="prefix" name="file-earmark-plus"></sl-icon>
                Save as Note
              </sl-button>
            `:""}
      </sl-dialog>
    `:""}};customElements.define("copio-doc-ocr-dialog",l);var f=class{constructor(e=null){this.key=e}setKey(e){this.key=e}getKey(){return this.key}isValid(){return!!this.key}getTier(){return this.key?this.key.startsWith("pro_")?"pro":this.key.startsWith("ent_")?"enterprise":"commercial":"community"}};a("export",y);a("ocr",new m);a("sync",g);a("pdf",new u);a("imageProcessor",new c);export{G as BUILD_DATE,ie as COPIO_EVENTS,c as Canvas2DAdapter,ge as CopioAddEditDialog,he as CopioCarousel,l as CopioDocOcrDialog,re as CopioEngine,ue as CopioHeader,de as CopioImages,fe as CopioLoader,me as CopioRow,ve as CopioScanner,we as CopioSyncDialog,E as DocRepository,te as Document,Z as ImageProcessorPort,w as IndexedDbStorageAdapter,f as LicenseManager,C as MemoryStorageAdapter,q as NullImageProcessorAdapter,F as NullOcrAdapter,Q as NullPdfAdapter,Pe as NullSyncAdapter,V as OcrPort,ee as Page,u as PdfKitAdapter,H as PdfPort,ke as PeerJsAdapter,p as SUPPORTED_LANGUAGES,se as ScanSession,S as StoragePort,g as SyncManager,Oe as SyncPort,m as TesseractWasmAdapter,J as VERSION,ye as adoptScannerStyles,pe as clearNotifications,T as createDefaultAdapter,ae as dispatchCopioEvent,R as docRepository,$e as exportDocumentAsImages,Ae as exportDocumentAsMarkdown,Te as exportDocumentAsPdf,$ as extractExif,O as fileToBase64,N as getAssetBase,ce as getContainer,I as getCroppedSrc,Se as getOcrWorker,oe as getRegisteredService,be as getScannerStyleSheet,Y as hasActiveEdits,M as loadCropper,z as loadJsZip,B as loadMarked,U as loadPdfKit,W as loadPeerJs,j as loadQrCode,L as loadScript,K as loadTesseract,X as normalizeEditStack,i as notify,A as randomId,d as recognizeDocumentPages,Ce as recognizeImageText,a as registerService,ne as renderPdfPagesToDataUrls,_ as resolveAssetUrl,P as rotateSrc,xe as scannerCss,D as setAssetBase,le as setContainer,h as terminateOcrWorker,k as thresholdSrc};
//# sourceMappingURL=index.js.map
