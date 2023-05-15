import {
  useState,
  useEffect,
  useDeferredValue,
  useTransition,
  ChangeEvent,
} from "react";
import debounce from "lodash/debounce";

const searchAPI = (query: any) => {
  // 네트워크 요청을 시뮬레이션하기 위해 Promise를 반환합니다.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Search results for: ${query}`);
    }, 2000);
  });
};

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const deferredResult = useDeferredValue(searchResult);
  const [isPending, startTransition] = useTransition();

  // debounce를 사용하여 사용자 입력을 지연시킴
  const debouncedSearch = debounce((value: any) => {
    setIsSearching(true);
    setQuery(value);
  }, 500);

  useEffect(() => {
    if (query && isSearching) {
      startTransition(() => {
        searchAPI(query).then((result) => {
          setSearchResult(result);
          setIsSearching(false);
        });
      });
    }
  }, [query, isSearching, startTransition]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // 사용자 입력이 발생할 때마다 debounce된 함수를 호출
    debouncedSearch(value);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        disabled={isPending}
      />
      <button onClick={debouncedSearch} disabled={isPending}>
        {isPending ? "Searching..." : "Search"}
      </button>
      {isPending ? "Searching..." : deferredResult}
    </div>
  );
};

export default SearchComponent;
