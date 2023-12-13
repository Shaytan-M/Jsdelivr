<template>
  <v-container>
    <ul>
      <li>
        <h3>Name</h3>
        <p>{{ packageInfo.name }}</p>
      </li>
      <li>
        <h3>Type</h3>
        <p>{{ packageInfo.type }}</p>
      </li>
      <li v-if="packageInfo?.tags?.latest">
        <h3>Last Version</h3>
        <p>{{ packageInfo.tags.latest }}</p>
      </li>
      <li>
        <h3>Bandwidth</h3>
        <p>{{ packageInfo.bandwidth }}</p>
      </li>
      <li>
        <h3>Hits</h3>
        <p>{{ packageInfo.hits }}</p>
      </li>
    </ul>
  </v-container>
</template>
<script>
import { useAppStore } from "@/store/app";
export default {
  setup() {
    let packageInfo = useAppStore().packageInfo;
    return {
      packageInfo,
    };
  },
};
</script>
