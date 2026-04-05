(() => {
  const navShell = document.querySelector("[data-nav-shell]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const backTopButton = document.querySelector("[data-back-top]");
  const DEFAULT_WA = "https://api.whatsapp.com/send?phone=601126011931&text=Hi%20Luqman,%20saya%20nak%20semak%20kelayakan%20dan%20tanya%20pasal%20kereta.";

  const formatRM = (value) => new Intl.NumberFormat("ms-MY", {
    style: "currency",
    currency: "MYR",
    maximumFractionDigits: 0
  }).format(value);

  const closeMobileMenu = () => {
    if (!navShell) return;
    navShell.classList.remove("menu-open");
    document.body.classList.remove("menu-open");
  };

  if (menuToggle && navShell && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navShell.classList.toggle("menu-open");
      document.body.classList.toggle("menu-open", isOpen);
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", (event) => {
      if (!navShell.classList.contains("menu-open")) return;
      if (!navShell.contains(event.target)) {
        closeMobileMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 980) closeMobileMenu();
    });
  }

  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;

    if (navShell) {
      navShell.classList.toggle("is-shrunk", y > 30);
    }

    if (backTopButton) {
      backTopButton.classList.toggle("is-visible", y > 420);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backTopButton) {
    backTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      const navOffset = navShell ? navShell.offsetHeight + 22 : 90;
      const top = target.getBoundingClientRect().top + window.scrollY - navOffset;

      window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
      history.replaceState(null, "", href);
    });
  });

  const revealElements = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -10% 0px" });

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  const markImageAsMissing = (img) => {
    const wrapper = img.closest(".image-frame");
    if (!wrapper) return;
    const label = img.dataset.fallbackLabel;
    if (label) wrapper.setAttribute("data-label", label);
    wrapper.classList.add("is-missing");
    img.style.display = "none";
  };

  document.querySelectorAll("img[data-fallback-label]").forEach((img) => {
    img.addEventListener("error", () => markImageAsMissing(img));

    if (img.complete && img.naturalWidth === 0) {
      markImageAsMissing(img);
    }
  });

  document.querySelectorAll("[data-loan-calculator]").forEach((form) => {
    const result = form.querySelector("[data-calc-result]");
    const sendLink = form.querySelector("[data-calc-send]");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const harga = Number(form.elements.harga.value);
      const downpayment = Number(form.elements.downpayment.value);
      const tempohTahun = Number(form.elements.tempoh_tahun.value);
      const kadarFaedah = Number(form.elements.kadar_faedah.value);

      if (!harga || !tempohTahun || harga <= 0 || tempohTahun <= 0 || downpayment < 0 || kadarFaedah < 0) {
        if (result) result.textContent = "Sila isi semua nilai dengan betul.";
        if (sendLink) sendLink.href = DEFAULT_WA;
        return;
      }

      if (downpayment >= harga) {
        if (result) result.textContent = "Downpayment mesti lebih rendah daripada harga kereta.";
        if (sendLink) sendLink.href = DEFAULT_WA;
        return;
      }

      const principal = harga - downpayment;
      const months = tempohTahun * 12;
      const monthlyRate = kadarFaedah / 100 / 12;
      const monthlyPayment = monthlyRate === 0
        ? principal / months
        : principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -months)));

      const roundedMonthly = Math.round(monthlyPayment);
      const brand = form.dataset.brand || "kereta";
      const monthlyText = formatRM(roundedMonthly);

      if (result) {
        result.textContent = `Anggaran bulanan: ${monthlyText} sebulan.`;
      }

      if (sendLink) {
        const message = `Hi Luqman, saya dah guna estimator ${brand}. Anggaran bulanan saya ${monthlyText} untuk harga ${formatRM(harga)}, downpayment ${formatRM(downpayment)}, tempoh ${tempohTahun} tahun, kadar ${kadarFaedah}%. Boleh bantu semak kelayakan saya?`;
        sendLink.href = `https://api.whatsapp.com/send?phone=601126011931&text=${encodeURIComponent(message)}`;
      }
    });
  });
})();
