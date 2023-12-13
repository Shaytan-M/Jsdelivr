<template>
  <v-container>
    <v-responsive class="mx-auto" max-width="344">
      <v-form @submit.prevent="searchEvent">
        <v-text-field
          :loading="loading"
          density="compact"
          variant="solo"
          label="Search packeges"
          append-inner-icon="mdi-magnify"
          single-line
          clearable
          @click:append-inner="searchEvent"
          v-model="searchInput"
          type="search"
        ></v-text-field>
      </v-form>
    </v-responsive>
    <v-data-table
      v-model:page="page"
      :items-per-page="itemsPerPage"
      :headers="headers"
      :items="tableItems"
      item-value="name"
      item-key="id"
    >
      <template v-slot:item="props">
        <tr @click="tableClick(props.item)">
          <td>
            {{ props.item.name }}
          </td>
          <td>
            {{ props.item.type }}
          </td>
        </tr>
      </template>
      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </template>
    </v-data-table>
  </v-container>
  <v-dialog v-model="modalWindow" width="800px">
    <v-card>
      <v-card-text v-if="packageInfo">
        <modalWindowTableVue />
      </v-card-text>
      <v-card-text v-else>
        Please stand by
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="closeModalWindow"
          >Close Dialog</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-container>
    <div class="messageError" v-if="statusError">
      <h4>{{ messageError }}</h4>
    </div>
  </v-container>
</template>

<script lang="ts">
import { useAppStore } from "@/store/app";
import { PackagesObject, HeadersMainTable } from "@/interface/interface";
import modalWindowTableVue from "./modalWindowTable.vue";
export default {
  data() {
    return {
      page: 1,
      itemsPerPage: 10,
      loading: false,
      modalWindow: false,
      searchInput: "",
      statusError: false,
      messageError: "",
      headers: [
        { title: "Name", key: "name" },
        { title: "Type", key: "type" },
      ] as HeadersMainTable[],
    };
  },
  components: {
    modalWindowTableVue,
  },
  setup() {
    let store = useAppStore();
    store.getMostPopularPackegs();
    return {
      store,
    };
  },
  computed: {
    tableItems() {
      return this.store.mostPopularPackage;
    },
    pageCount() {
      return Math.ceil(this.tableItems.length / this.itemsPerPage);
    },
    packageInfo() {
      return this.store.packageInfo;
    },
  },
  watch: {
    statusError(value) {
      if (value) {
        setTimeout(() => {
          this.statusError = false;
          this.messageError = "";
        }, 2000);
      }
    },
  },
  methods: {
    tableClick(item: PackagesObject) {
      this.store.getPackage(item.type, item.name);
      this.modalWindow = true;
    },
    closeModalWindow() {
      this.modalWindow = false;
      this.store.packageInfo = null;
    },
    searchEvent() {
      this.loading = true;
      if (this.searchInput) {
        this.store
          .searchPackage(this.searchInput)
          .then(() => {
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
            this.statusError = true;
            this.messageError = "Invalid Package Name";
          });
      } else {
        this.store.getMostPopularPackegs().then(() => {
          this.loading = false;
        });
      }
    },
  },
};
</script>
<style lang="scss">
.messageError {
  position: absolute;
  right: 50px;
  top: 50px;
  width: 300px;
  padding: 20px;
  background: rgba(49, 49, 47, 0.842);
  border-radius: 10px;
  border: 1px solid rgb(172, 11, 11);
  h4 {
    color: rgb(172, 11, 11);
  }
}
.v-table__wrapper {
  table {
    min-width: 600px;
    overflow-y: scroll;
  }
  thead {
    tr {
      th {
        &:first-child {
          text-align: center;
        }
      }
    }
  }
  tbody {
    tr {
      cursor: pointer;
      &:hover {
        background: rgba(255, 255, 255, 0.13);
      }
    }
  }
}
</style>
