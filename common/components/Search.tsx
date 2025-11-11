import icons from "@/constant/icons";
import { Image, TextInput, View } from "react-native";
import { useSearchHook } from "../hooks/search.hook";

const Search = () => {
  const { search, handleSearch, filterModal, setFilterModal } = useSearchHook();

  return (
    <>
      <View className="flex flex-row items-center justify-between w-full px-4  bg-lightGray rounded-md py-2">
        <View className="flex-1 flex flex-row items-center justify-start z-50">
          <Image source={icons.search} className="size-5" />
          <TextInput
            value={search}
            onChangeText={handleSearch}
            placeholder="Search for anything"
            className="text-sm font-rubik text-black-300 ml-2 flex-1"
            placeholderTextColor="gray"
          />
        </View>
      </View>
    </>
  );
};

export default Search;
