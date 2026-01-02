export default function customCard(editor) {
    const domc = editor.DomComponents;
    const blockManager = editor.BlockManager;

    domc.addType("custom-card", {
        model: {
            defaults: {
                tagName: "div",
                classes: ["custom-card"],
                traits: [
                    {
                        type: "text",
                        label: "Image URL",
                        name: "imageUrl",
                        changeProp: 1,
                        value: "https://placehold.co/600x300?text=Custom+Card",
                    },
                    {
                        type: "text",
                        label: "Title Text",
                        name: "title",
                        changeProp: 1,
                        value: "Card Title",
                    },
                    {
                        type: "textarea",
                        label: "Description Text",
                        name: "description",
                        changeProp: 1,
                        value: "Card description goes here...",
                    },
                    {
                        type: "text",
                        label: "Button Label",
                        name: "buttonText",
                        changeProp: 1,
                        value: "Click Me",
                    },
                    {
                        type: "text",
                        label: "Button Link",
                        name: "buttonLink",
                        changeProp: 1,
                        value: "#",
                    },
                ],
                components: [
                    {
                        tagName: "img",
                        attributes: {
                            src: "https://placehold.co/600x300?text=Custom+Card",
                        },
                    },
                    { tagName: "h3", content: "Card Title" },
                    { tagName: "p", content: "Card description goes here..." },
                    {
                        tagName: "a",
                        content: "Click Me",
                        attributes: { href: "#", class: "btn" },
                    },
                ],
            },

            init() {
                this.on("change:imageUrl", this.updateImage);
                this.on("change:title", this.updateTitle);
                this.on("change:description", this.updateDescription);
                this.on("change:buttonText", this.updateButton);
                this.on("change:buttonLink", this.updateLink);
            },

            updateImage() {
                this.components().at(0).addAttributes({
                    src: this.get("imageUrl"),
                });
            },

            updateTitle() {
                this.components().at(1).set("content", this.get("title"));
            },

            updateDescription() {
                this.components().at(2).set("content", this.get("description"));
            },

            updateButton() {
                this.components().at(3).set("content", this.get("buttonText"));
            },

            updateLink() {
                this.components().at(3).addAttributes({
                    href: this.get("buttonLink"),
                });
            },
        },
    });

    blockManager.add("custom-card-block", {
        label: `
            <div style="
                border:1px solid #ddd;
                border-radius:6px;
                padding:6px;
                font-size:12px;
                text-align:center;
            ">
                <i class="fas fa-address-card" style="font-size:22px;"></i>
                <strong>Custom Card</strong>
            </div>`,
        category: "Custom Components",
        content: { type: "custom-card" },
    });
}
