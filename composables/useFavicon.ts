export function useFavicon(url: MaybeRefOrGetter<string>) {
  const urlAsRef = resolveRef(url);

  const store = useStyleStore();

  return computed(() => `${store.faviconProviderUrl}${urlAsRef.value}`);
}
