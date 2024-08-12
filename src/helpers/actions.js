export function lazyCallable(node, callback) {
  let observer = new IntersectionObserver(
    (entries) => {
      // for some god damn reason the callbacks fire on initialization, even when there is no intersection,
      // so we have to check manually
      for (const entry of entries) {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(node);
          return;
        }
      }
    },
    {
      root: null, // use viewport as root
      threshold: 0.2,
      rootMargin: "0px", // shrink/expand the root element's area, not very useful
    }
  );

  setTimeout(() => {
    // console.log("mounting observer in the past");
    observer.observe(node);
  }, 4000);
}
