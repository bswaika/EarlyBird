const baseUrl = "http://68.181.16.127:3000";

exports.createTypeform = async (form_id, activityId) => {
  console.log(process.env.TYPEFORM_TOKEN);
  console.log(form_id);
  await fetch(`https://api.typeform.com/forms/${form_id}/webhooks/earlyBird`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${process.env.TYPEFORM_TOKEN}`,
    },
    body: JSON.stringify({
      url: `${baseUrl}/api/typeformWebhook/${activityId}`,
      enabled: true,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((json) => console.log(json))
    .catch((err) => console.log(err));

  return;
};

exports.deleteTypeform = async (form_id) => {
  await fetch(
    `https://api.typeform.com/forms/${form_id}/webhooks/${"earlyBird"}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + process.env.TYPEFORM_TOKEN,
      },
    }
  );
};
