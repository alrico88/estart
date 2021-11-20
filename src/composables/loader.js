import { ref } from "@vue/composition-api";

export function useLoader(initState = false) {
  const loading = ref(initState);

  function setLoading(turn) {
    loading.value = turn;
  }

  return {
    loading,
    setLoading
  };
}
