export function useLoader(initState = false) {
  const loading = ref<boolean>(initState);

  function setLoading(turn: boolean): void {
    loading.value = turn;
  }

  return {
    loading,
    setLoading,
  };
}
