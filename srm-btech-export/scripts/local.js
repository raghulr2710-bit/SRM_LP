/* Offline behavior only. Never restructure the captured design. */
"use strict";
(() => {
  const dialog = document.createElement("dialog");
  dialog.className = "local-dialog";
  const text = document.createElement("p");
  const close = document.createElement("button");
  close.type = "button";
  close.textContent = "Close";
  close.addEventListener("click", () => dialog.close());
  dialog.append(text, close);
  document.body.append(dialog);
  const explain = (message) => {
    text.textContent = message;
    dialog.showModal();
  };
  document.querySelectorAll("[data-offline-label]").forEach((link) =>
    link.addEventListener("click", (event) => {
      event.preventDefault();
      explain(
        `${link.dataset.offlineLabel}: this destination is not included in the local copy. Configure a local page or service to enable it.`,
      );
    }),
  );
  document.querySelectorAll(".offline-video").forEach((video) => {
    const open = () =>
      explain(
        "This is a saved video thumbnail. The video stream is not included in this local website.",
      );
    video.addEventListener("click", open);
    video.addEventListener("keydown", (event) => {
      if (["Enter", " "].includes(event.key)) {
        event.preventDefault();
        open();
      }
    });
  });
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      explain(
        "This is a local frontend preview. No application has been submitted. Connect your own admissions backend to enable this form.",
      );
    });
    form
      .querySelectorAll('button:not([data-toggle]),input[type="submit"]')
      .forEach((button) =>
        button.addEventListener("click", (event) => {
          event.preventDefault();
          explain(
            button.className.includes("Captcha")
              ? "The CAPTCHA is part of the captured interface. Verification requires the original server and is not available in this local copy."
              : "This is a local frontend preview. No application has been submitted and no email has been sent. Connect your own backend to enable this action.",
          );
        }),
      );
  });
  document.querySelectorAll('[data-toggle="collapse"]').forEach((button) =>
    button.addEventListener("click", () => {
      const target = document.querySelector(
        button.dataset.target || "___missing",
      );
      if (target) {
        const open = target.classList.toggle("show");
        button.setAttribute("aria-expanded", String(open));
      }
    }),
  );
  document.querySelectorAll('a[data-toggle="tab"]').forEach((link) =>
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (!target || !target.textContent.trim()) {
        explain(
          "This account panel was not included in the saved page. Capture from the URL to include its markup.",
        );
        return;
      }
      target.parentElement
        .querySelectorAll(":scope > .tab-pane")
        .forEach((panel) => {
          const active = panel === target;
          panel.classList.toggle("active", active);
          panel.classList.toggle("show", active);
          panel.classList.toggle("in", active);
          if (active) panel.classList.remove("sf-hidden", "fade");
        });
    }),
  );
})();
