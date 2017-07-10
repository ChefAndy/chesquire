defmodule Chesquire.PageController do
  use Chesquire.Web, :controller
  plug :put_layout, false when action in [:case_xml]

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
    render conn, "case.html", case_slug: :case_slug
  end
  def case_xml(conn, _params) do
    token=IO.inspect(Guardian.Plug.current_resource(conn).apikey)

    url = "http://library.law.harvard.edu/projects/32044038642120_redacted_CASEMETS_0003.xml"
    case_text = case logged_in?(conn) do
      true
        -> HTTPoison.get!(url, %{"Authorization": "Token " <> token})
      _ 
        -> HTTPoison.get!(url)
    end
  
    conn
    |> put_resp_content_type("text/xml")
    |> render "case.xml.html", case_text: case_text.body

  end

  defp logged_in?(conn), do: Guardian.Plug.authenticated?(conn)
end
