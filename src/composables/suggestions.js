import { watch, ref } from "@vue/composition-api";
import debounce from "lodash/debounce";
import { useLoader } from "./loader";
import axios from "axios";

export function useSuggestions(query) {
  const suggestions = ref([]);
  const { loading, setLoading } = useLoader(false);

  function setSuggestions(val) {
    suggestions.value = val;
  }

  watch(
    query,
    debounce(async () => {
      try {
        setLoading(true);

        if (query.value === "") {
          setSuggestions([]);
        } else {
          const res = await axios.get(`/api/suggestion?query=${query.value}`);

          setSuggestions(res.data);
        }
      } catch (err) {
        console.error(err);

        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 500)
  );

  return {
    suggestions,
    loading
  };
}
