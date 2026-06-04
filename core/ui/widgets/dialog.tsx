import { Component, JSX } from "react";
import { createRoot, Root } from "react-dom/client";

export class Dialog extends Component {
    static node: HTMLElement | null = null;
    static root: Root | null = null;

    static open(dialog: JSX.Element) {
        // A dialog is already open
        if (Dialog.root !== null) return;

        // Prepare the DOM to show dialogs by creating necessary elements and events.
        if (Dialog.node === null) {
            // Container
            let container = document.createElement('aside');
            container.id = 'app-dialog';
            document.body.appendChild(container);
            Dialog.node = container;
            // Close the dialog if clicking outside of its box
            container.onclick = function (ev) {
                const target = ev.target as Element;
                if (target.closest('dialog') != null) return;
                Dialog.close();
            };
        }

        // Create the dialog
        Dialog.root = createRoot(Dialog.node);
        Dialog.root.render(dialog);
        Dialog.node.classList.add('active');

        // Waits for React to have rendered to call the showModal function on the dialog. This is needed to have the backdrop enabled
        function showModal() {
            if (Dialog.node.childNodes.length === 0) setTimeout(showModal, 50);
            else Dialog.node.childNodes.forEach(c => {
                if (typeof c.showModal === 'function') c.show();
            })
        };

        showModal();
    }

    static close() {
        if (!Dialog.root) return;
        Dialog.root.unmount();
        Dialog.root = null;
        if (!Dialog.node) return;
        Dialog.node.classList.remove('active');
    }
}