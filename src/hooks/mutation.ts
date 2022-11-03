import { useMutation } from "@tanstack/react-query";
import groupAPI from "api/groups";
import eventAPI from "api/events";
import { register } from "api/auth";

export const useCreateGroupMutation = (onSuccess: () => void) => {
  return useMutation(groupAPI.createGroup, {
    onSuccess,
  }).mutate;
};

export const useCreateEventMutation = (onSuccess: () => void) => {
  return useMutation(eventAPI.createEvent, {
    onSuccess: onSuccess,
  }).mutate;
};

export const useRegisterMutation = (onSuccess: () => void) => {
  return useMutation(register, {
    onSuccess: onSuccess,
  }).mutate;
};
