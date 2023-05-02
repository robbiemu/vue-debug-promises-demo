<style src="../../styles/app.scss"></style>

<template>
  <form v-if="defaultEmail != null" :action="actionUrl" method="post" target="_blank"
        class="flex-columns-container height-fill">
    <div class="form-group">
      <label for="email" class="form-label">{{ label1 }}</label>
      <input id="email" type="email" class="form-control" name="email" placeholder="example@contoso.com"
             v-model="defaultEmail" />
    </div>
    <div class="form-group height-fill flex-columns-container">
      <label for="message" class="form-label">{{ label2 }}</label>
      <textarea id="message" class="form-control flex-grow" name="message" :placeholder="placeholder"></textarea>
    </div>
    <div class="form-group">
      <button type="submit" class="button button-primary">Submit</button>
    </div>
  </form>
  <div v-else class="loading"></div>
</template>

<script lang="ts">
import {getValues} from "@azure/api-management-custom-widgets-tools"
import {valuesDefault} from "../../values"

interface AppProps {
  label1: string | null,
  label2: string | null,
  placeholder: string | null,
  actionUrl: string | null,
  defaultEmail: string | null,
}

export default {
  data() {
    return {
      label1: null,
      label2: null,
      placeholder: null,
      actionUrl: null,
      defaultEmail: null,
    } as AppProps
  },

  inject: ["secretsPromise", "requestPromise"],

  async mounted(): Promise<void> {
    const editorData = getValues(valuesDefault)
    this.label1 = editorData.label1
    this.label2 = editorData.label2
    this.placeholder = editorData.placeholder
    this.actionUrl = editorData.actionUrl

    const [secrets, request]: [any, any] = await Promise.all([this.secretsPromise, this.requestPromise])

    if (!secrets.userId) {
      this.defaultEmail = ""
      return
    }

    request(`/users/${secrets.userId}`)
      .then((e:any) => e.json())
      .then(({properties}: {properties: any}) => this.defaultEmail = properties.email)
      .catch((e: any) => {
        console.error("Could not prefill the email address!", e)
        this.defaultEmail = ""
      })
  },
}
</script>
