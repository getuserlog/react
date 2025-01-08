"use client";

import React from "react";

var CDN_URL = "https://cdn.getuserlog.com/userlog.js";

/**
 * UserLogProvider-Komponente
 * Initialisiert UserLog und lädt das benötigte Skript.
 */
export function UserLogProvider({ project, api_key, children }) {
  // Initialisiere globale Variablen für UserLog, falls sie noch nicht existieren.
  if (typeof window !== "undefined") {
    window.userlogq = window.userlogq || [];
    window.userlog =
      window.userlog ||
      ((...args) => {
        if (window.userlogq) window.userlogq.push(args);
      });
  }

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // Konfiguriere UserLog mit api_key und Projekt.
      window.userlog("setConfig", api_key, project);

      // Erstelle und füge das UserLog-Skript in die Seite ein.
      const script = document.createElement("script");
      script.id = "userlog-script";
      script.src = CDN_URL;
      script.async = true;
      if (!document.getElementById(script.id)) {
        document.body.appendChild(script);
      }

      // Aufräumen: Entferne das Skript beim Unmount der Komponente.
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [project, api_key]);

  return <>{children}</>;
}

/**
 * Setzt die Benutzer-ID für UserLog.
 * @param {string} userId - Die zu setzende Benutzer-ID.
 */
function setUserId(userId) {
  if (typeof window !== "undefined") {
    window.userlog("setUserId", userId);
  }
}

/**
 * Löscht die aktuell gesetzte Benutzer-ID.
 */
function clearUserId() {
  if (typeof window !== "undefined") {
    window.userlog("clearUserId");
  }
}

/**
 * Aktiviert oder deaktiviert den Debug-Modus.
 * @param {boolean} [value=true] - Debug-Wert.
 */
function setDebug(value = true) {
  if (typeof window !== "undefined") {
    window.userlog("setDebug", value);
  }
}

/**
 * Sendet ein Tracking-Event an UserLog.
 * @param {object} eventData - Die Daten des zu verfolgenden Events.
 */
function track(eventData) {
  if (typeof window !== "undefined") {
    window.userlog("track", eventData);
  }
}

/**
 * useUserLog-Hook stellt Funktionen zur Interaktion mit UserLog bereit.
 */
export function useUserLog() {
  return {
    setDebug,
    setUserId,
    clearUserId,
    track,
  };
}
