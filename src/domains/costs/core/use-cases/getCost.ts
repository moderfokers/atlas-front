"use server";

import { RequestService } from "@/services/RequestService";
import { ICost } from "../../data/cost-columns";

export interface IGetCostsInput {
  id: string;
}

export interface IGetCostsOutput extends ICost {}

export async function getCost({ id }: IGetCostsInput) {
  const result = await RequestService.fetch<IGetCostsOutput>(
    `/cost-centers/${id}`,
    {
      method: "GET",
    }
  );

  return result;
}
