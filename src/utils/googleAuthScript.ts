interface googleAuthScriptConfig {
  scriptId: string;
  client_id: string;
  buttonId: string;
  onLoadCallback: (response: any) => void;
  buttonProps: GsiButtonConfiguration;
}

type initializeGsiConfig = Omit<googleAuthScriptConfig, "scriptId">;

const initializeGsi = ({
  client_id,
  onLoadCallback,
  buttonId,
  buttonProps,
}: initializeGsiConfig) => {
  const google = window.google;
  if (!google) return;
  google.accounts.id.initialize({
    client_id,
    callback: onLoadCallback,
  });
  const googleButton = document.getElementById(buttonId);
  if (!googleButton) return;
  google.accounts.id.renderButton(googleButton, buttonProps);
};

export const loadGoogleAuthScript = ({
  scriptId,
  client_id,
  buttonId,
  onLoadCallback,
  buttonProps,
}: googleAuthScriptConfig) => {
  const existedGoogleScript = document.getElementById(scriptId);
  if (!existedGoogleScript) {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.id = scriptId;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      initializeGsi({ client_id, buttonId, onLoadCallback, buttonProps });
    };
  }
};

export const removeGoogleAuthScript = (scriptId: string) => {
  window.google?.accounts.id.cancel();
  document.getElementById(scriptId)?.remove();
};
