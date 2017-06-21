defmodule Chesquire.PageController do
  use Chesquire.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def chat(conn, _params) do
    render conn, "chat.html", room: :room
  end

  def chatlobby(conn, _params) do
    render conn, "chat.html", room: "lobby"
  end


  def case(conn, _params) do
    render conn, "case.html"
  end
end
