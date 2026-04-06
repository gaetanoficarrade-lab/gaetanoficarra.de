import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface TrackingScript {
  id: string;
  name: string;
  code: string;
  position: string;
  active: boolean;
}

const DynamicScripts = () => {
  const [scripts, setScripts] = useState<TrackingScript[]>([]);

  useEffect(() => {
    supabase
      .from("tracking_scripts")
      .select("*")
      .eq("active", true)
      .then(({ data }) => {
        if (data) setScripts(data);
      });
  }, []);

  useEffect(() => {
    scripts.forEach((script) => {
      const container = document.createElement("div");
      container.setAttribute("data-tracking-script", script.id);
      container.innerHTML = script.code;
      
      // Execute scripts by re-creating script elements
      const scriptElements = container.querySelectorAll("script");
      scriptElements.forEach((oldScript) => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        if (oldScript.textContent) {
          newScript.textContent = oldScript.textContent;
        }
        oldScript.replaceWith(newScript);
      });

      if (script.position === "head") {
        document.head.appendChild(container);
      } else {
        document.body.appendChild(container);
      }
    });

    return () => {
      document.querySelectorAll("[data-tracking-script]").forEach((el) => el.remove());
    };
  }, [scripts]);

  return null;
};

export default DynamicScripts;
