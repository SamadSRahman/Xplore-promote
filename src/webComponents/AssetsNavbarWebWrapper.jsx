import React from "react";
import ReactDOM from "react-dom/client";
import AssetsNavbar from "../components/AssetsNavbar/AssetsNavbar.jsx";
import PreviewScreen from "../components/PreviewScreen.jsx";
import ScreensSection from "../components/ScreensSection/ScreensSection.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

class ReactElement extends HTMLElement {
  static get observedAttributes() {
    return ["component-type"]; // Observe changes to these attributes
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.container = document.createElement("div");
    this.shadow.appendChild(this.container);
  }

  connectedCallback() {
    this.renderReactComponent();
  }

  attributeChangedCallback() {
    this.renderReactComponent();
  }

  renderReactComponent() {
    const componentType = this.getAttribute("component-type") || "AssetsNavbar";

    let ComponentToRender;
    switch (componentType) {
      case "AssetsNavbar":
        ComponentToRender = AssetsNavbar;
        break;
      case "Preview":
        ComponentToRender = PreviewScreen;
        break;
      case "ScreensSection":
        ComponentToRender = ScreensSection;
        break;
      default:
        ComponentToRender = null;
    }

    const root = ReactDOM.createRoot(this.container);
    root.render(
      <>
   
        <BrowserRouter>
          <Routes>
          <Route path='/editor/:campaignId/:page' element={<ComponentToRender />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

customElements.define("asset-navbar-web-component", ReactElement);
