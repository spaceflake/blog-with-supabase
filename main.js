import "./style.css"
import { supabase } from "./supabase"

const blogsContainer = document.getElementById("blogs")
const form = document.getElementById("form")
const title = document.getElementById("title")
const content = document.getElementById("content")
const date = document.getElementById("date")

const useData = async () => {
  const { data, error } = await supabase.from("blogs").select() // gets the data from supabase

  let html = ""

  data.forEach((blog) => {
    html += `
    <div data-id="${blog.id}" class="bg-gray-100 p-5 shadow-lg hover:bg-gray-200 flex flex-col">
      <span class="">${blog.created_at}
      <h1 class="text-2xl text-blue-400">${blog.title}</h1>
      <p>${blog.content}</p>
      <button id="delBtn" class=" bg-red-600 text-white py-1 px-3">DELETE</button>
    </div>
    `
  })

  blogsContainer.innerHTML = html

  const delBtn = document.querySelectorAll("#delBtn")
  delBtn.forEach((btn) => {
    btn.addEventListener("click", deleteBlog)
  })
}

window.addEventListener("DOMContentLoaded", useData)

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const { data, error } = await supabase.from("blogs").insert([
    {
      title: title.value,
      content: content.value,
      created_at: date.value,
    },
  ]) // insert data into supabase
  form.reset()
  useData()
})

const deleteBlog = async (e) => {
  const id = e.currentTarget.closest("div").getAttribute("data-id")
  const { data, error } = await supabase
    .from("blogs")
    .delete()
    .match({ id: id })

  useData()
}
