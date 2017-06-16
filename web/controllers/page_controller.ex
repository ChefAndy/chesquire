defmodule Chesquire.PageController do
  use Chesquire.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
