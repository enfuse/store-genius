// This is so we can use the 'matterport-viewer' web component as a jsx element.
// Without this, we'll get an error like:
// ```
//    "Property 'matterport-viewer' does not exist on type 'JSX.IntrinsicElements'."
// ```
// For now, we are using the iframe method instead, but I'm committing this so we don't
// forget how it's done if we try web-component again.
declare namespace JSX {
  interface IntrinsicElements {
    "matterport-viewer": any;
  }
}