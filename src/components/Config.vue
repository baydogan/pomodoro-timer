<template>
  <div
    class="w-96 h-1/6 bg-white flex justify-center rounded-md m-auto shadow-xl flex-col fixed inset-0 z-50"
  >
    <div class="text-left w-full p-3 flex justify-between">
      <h1 class="">Timer Settings</h1>
      <fa icon="times" class="fa-1x text-black cursor-pointer" @click="closeSettingsPopup" />
    </div>
    <div class="w-11/12 mx-auto mb-1">
      <hr />
    </div>
    <div class="flex justify-center mt-1">
      <div class="flex flex-col">
        <span class="ml-3 text-sm">Pomodoro</span>
        <input class="config-inputs" type="number" />
      </div>
      <div class="flex flex-col">
        <span class="ml-3 text-sm">Short Break</span>
        <input class="config-inputs" type="number" />
      </div>
      <div class="flex flex-col">
        <span class="ml-3 text-sm"> Long Break</span>
        <input class="config-inputs" type="number" />
      </div>
      <hr />
    </div>
    <div class="flex justify-end p-4">
      <button class="p-3 bg-gray-800 w-20 rounded-md text-white">OK</button>
    </div>
  </div>

</template>

<script>
export default {
  setup(props, { emit }) {
    const closeSettingsPopup = () => {
      emit("closeSettingsPopup");
    };

    return {
      closeSettingsPopup,
    };
  },
};
</script>
