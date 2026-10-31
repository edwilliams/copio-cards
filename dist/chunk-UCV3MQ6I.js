import{b as s,c as o}from"./chunk-XEN5VKAV.js";var l=class extends o{static properties={syncState:{type:Object}};createRenderRoot(){return this}disconnectedCallback(){super.disconnectedCallback(),this.closeSyncDialog()}handleCloseClick=()=>{let e=this.querySelector("sl-dialog");e&&typeof e.hide=="function"?e.hide():this.closeSyncDialog()};closeSyncDialog=()=>{this.dispatchEvent(new CustomEvent("dialog:close",{bubbles:!0,composed:!1}))};render(){if(!this.syncState)return"";let{step:e,qrSvg:r,url:t,added:i,message:c}=this.syncState,n;return e==="init"?n=s`<sl-spinner></sl-spinner> Setting up…`:e==="waiting"?n=s`
        <div .innerHTML=${r}></div>
        ${t?s`
              <div style="margin: 0.75rem 0; word-break: break-all;">
                <a
                  class="sync-link"
                  href=${t}
                  target="_blank"
                  rel="noopener noreferrer"
                  style="color: var(--sl-color-primary-600, #0284c7); text-decoration: underline; font-size: 0.85rem;"
                >
                  ${t}
                </a>
              </div>
            `:""}
        <p style="margin-top: 0.5rem; color: #6b7280; font-size: 0.9rem;">Waiting for other device…</p>
      `:e==="connecting"?n=s`<sl-spinner></sl-spinner> Connecting…`:e==="syncing"?n=s`<sl-spinner></sl-spinner> Syncing…`:e==="done"?n=s`<p>
        Sync complete — ${i} doc${i!==1?"s":""} added.
      </p>`:e==="error"&&(n=s`<p style="color:var(--sl-color-danger-600)">
        Error: ${c}
      </p>`),s`
      <sl-dialog
        label="Link Device"
        open
        @sl-after-hide=${this.closeSyncDialog}
      >
        <div style="text-align:center;padding:1rem">${n}</div>
        <sl-button slot="footer" class="sync-close-btn" @click=${this.handleCloseClick}
          >Close</sl-button
        >
      </sl-dialog>
    `}};customElements.define("copio-sync-dialog",l);export{l as a};
//# sourceMappingURL=chunk-UCV3MQ6I.js.map
