// Utilities
import { defineStore } from "pinia";
import axios from "axios";
import { State, Package } from "@/interface/interface";
export const useAppStore = defineStore("app", {
  state: (): State => {
    return {
      mostPopularPackage: [],
      packageInfo: null,
    };
  },
  actions: {
    async getMostPopularPackegs(): Promise<void> {
      axios({
        method: "get",
        url: "https://data.jsdelivr.com/v1/stats/packages",
        responseType: "stream",
      }).then((response) => {
        this.mostPopularPackage = JSON.parse(response.data);
      });
    },
    async getPackage(type: string, name: string) {
      const response1 = await axios.get(
        `https://data.jsdelivr.com/v1/packages/${type}/${name}`,
        {
          responseType: "stream",
        }
      );
      const response2 = await axios.get(
        `https://data.jsdelivr.com/v1/stats/packages/${type}/${name}`,
        {
          responseType: "stream",
        }
      );
      this.packageInfo = {
        ...JSON.parse(response1.data),
        bandwidth: JSON.parse(response2.data).bandwidth.total,
        hits: JSON.parse(response2.data).hits.total,
      };
    },
    async searchPackage(name: string): Promise<void> {
      const res = await axios.get(
        `https://data.jsdelivr.com/v1/packages/npm/${name}`,
        {
          responseType: "stream",
        }
      );
      let objRes = {
        links: JSON.parse(res.data).links,
        name: JSON.parse(res.data).name,
        type: JSON.parse(res.data).type,
      };
      this.mostPopularPackage = [{ ...objRes }];
    },
  },
});
