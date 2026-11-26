import { useEffect, useRef } from 'react';
import { useEvents } from './useEvents';
import { useNotify } from './useNotify';
import { useOnlineStatus } from './useOnlineStatus';

export function useSyncOnReconnect() {
  const online = useOnlineStatus();
  const { sync } = useEvents();
  const notify = useNotify();
  const wasOffline = useRef(false);

  useEffect(() => {
    if (!online) {
      wasOffline.current = true;
      return;
    }
    if (!wasOffline.current) return;
    wasOffline.current = false;
    sync()
      .then((n) => n && notify({ title: `Sincronizamos ${n} ${n === 1 ? 'cambio' : 'cambios'}` }))
      .catch(() => notify({ title: 'No pudimos sincronizar tus cambios', description: 'Se reintentara al recargar la pagina.' }));
  }, [online, sync, notify]);
}
